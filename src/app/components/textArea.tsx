'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, ContentState, EditorChangeType, AtomicBlockUtils, Modifier } from 'draft-js';
import 'draft-js/dist/Draft.css';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { FaSmile, FaImage } from 'react-icons/fa';
import Image from 'next/image';
interface TextAreaProps {
  onChange?: (content: string) => void;
  placeholder?: string;
  initialValue?: string;
  onImageUpload?: (file: File) => Promise<string>;
}

const TextArea: React.FC<TextAreaProps> = ({
  onChange,
  placeholder = 'Digite sua mensagem...',
  initialValue = '',
  onImageUpload,
}) => {
  const [mounted, setMounted] = useState(false);
  const [editorState, setEditorState] = useState(() => {
    if (initialValue) {
      return EditorState.createWithContent(
        ContentState.createFromText(initialValue)
      );
    }
    return EditorState.createEmpty();
  });
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleKeyCommand = useCallback((command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  }, []);

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const addEmoji = (emoji: any) => {
    const selection = editorState.getSelection();
    const content = editorState.getCurrentContent();
    const newContent = Modifier.insertText(
      content,
      selection,
      emoji.native
    );
    const newEditorState = EditorState.push(
      editorState,
      newContent,
      'insert-emoji' as EditorChangeType
    );
    setEditorState(newEditorState);
    setShowEmojiPicker(false);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !onImageUpload) return;

    try {
      const imageUrl = await onImageUpload(file);
      const contentState = editorState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity(
        'IMAGE',
        'IMMUTABLE',
        { src: imageUrl }
      );
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorState = EditorState.set(
        editorState,
        { currentContent: contentStateWithEntity }
      );
      const newState = AtomicBlockUtils.insertAtomicBlock(
        newEditorState,
        entityKey,
        ' '
      );
      setEditorState(newState);
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
    }
  };

  const handleEditorChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
    if (onChange) {
      const contentState = newEditorState.getCurrentContent();
      const rawContent = convertToRaw(contentState);
      onChange(JSON.stringify(rawContent));
    }
  };

  const blockRendererFn = (block: any) => {
    if (block.getType() === 'atomic') {
      return {
        component: MediaBlock,
        editable: false,
      };
    }
  };

  if (!mounted) {
    return (
      <div className="border rounded-lg p-4 bg-white">
        <div style={{ minHeight: '100px' }} />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="border rounded-lg p-4 bg-white">
        <div style={{ minHeight: '100px' }}>
          <Editor
            editorState={editorState}
            onChange={handleEditorChange}
            handleKeyCommand={handleKeyCommand}
            placeholder={placeholder}
            blockRendererFn={blockRendererFn}
          />
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="flex gap-2 relative">
            <button
              onClick={toggleEmojiPicker}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
              type="button"
            >
              <FaSmile size={20} />
            </button>
            {showEmojiPicker && (
              <div className="absolute left-0 top-10 z-50">
                <Picker
                  data={data}
                  onEmojiSelect={addEmoji}
                  theme="light"
                  set="twitter"
                  locale="pt"
                />
              </div>
            )}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
              type="button"
            >
              <FaImage size={20} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const MediaBlock = (props: any) => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const { src } = entity.getData();
  const type = entity.getType();

  if (type === 'IMAGE') {
    return (
      <div className="my-4">
        <Image src={src} alt="" className="max-w-full rounded-lg" />
      </div>
    );
  }
  return null;
};

export default TextArea; 