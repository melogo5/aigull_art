import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, Switch, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useUnit } from 'effector-react';
import { $isCreateModalOpen, closeCreateModal, submitCreate, CreatePictureForm, uploadImageFx, createPictureFx } from './model/picturesStore';

export const CreatePictureModal: React.FC = () => {
  const isOpen = useUnit($isCreateModalOpen);
  const close = useUnit(closeCreateModal);
  const submit = useUnit(submitCreate);
  const loading = useUnit(uploadImageFx.pending) || useUnit(createPictureFx.pending);

  const [file, setFile] = useState<File | null>(null);

  const [form] = Form.useForm<CreatePictureForm>();

  const onOk = async () => {
    const values = await form.validateFields();
    submit({ ...values, imageFile: file });
  };

  return (
    <Modal title="Добавить картину" open={isOpen} onOk={onOk} onCancel={close} confirmLoading={loading} okText="Сохранить" cancelText="Отмена">
      <Form form={form} layout="vertical" initialValues={{ available: true }}>
        <Form.Item name="name" label="Название" rules={[{ required: true, message: 'Введите название' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Описание">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item name="year" label="Год" rules={[{ required: true }]}>
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="material" label="Материал" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="width" label="Ширина (см)" rules={[{ required: true }]}>
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="height" label="Высота (см)" rules={[{ required: true }]}>
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="available" label="Доступна к продаже" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="Изображение">
          <Upload beforeUpload={(f) => { setFile(f); return false; }} maxCount={1} accept="image/*" listType="text">
            <Button icon={<UploadOutlined />}>Выбрать файл</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreatePictureModal;


