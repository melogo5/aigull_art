import React, { useEffect, useState } from 'react'
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Switch,
  Upload,
  Button,
  FormProps,
} from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useUnit } from 'effector-react'
import {
  uploadCreateImageFx,
  createPictureFx,
  createPicture,
} from '../model/create'
import { editPictureFx, editPicture } from '../model/edit'
import { modalController } from '../model/modal'
import { setFormValues } from '../model/form'
import { EditPictureBody, CreatePictureForm } from '@/shared/api/pictures'

const { $isOpen, $title, $values, close } = modalController

export const CreatePictureModal: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [form] = Form.useForm<CreatePictureForm>()

  const [
    isOpen,
    title,
    modalValues,
    uploadPending,
    createPending,
    updatePending,
  ] = useUnit([
    $isOpen,
    $title,
    $values,
    uploadCreateImageFx.pending,
    createPictureFx.pending,
    editPictureFx.pending,
  ])
  const isEditMode = modalValues.mode === 'EDIT'
  const loading = uploadPending || createPending || updatePending

  useEffect(() => {
    const initialValues = modalValues.values as EditPictureBody
    if (isOpen && Object.keys(initialValues).length) {
      form.setFieldsValue({
        name: initialValues.name,
        description: initialValues.description,
        year: initialValues.year,
        available: initialValues.available,
        width: initialValues.width,
        height: initialValues.height,
        material: initialValues.material,
      })
    } else {
      form.resetFields()
    }
    setFile(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, modalValues])

  const onFinish: FormProps['onFinish'] = values => {
    const formData = {
      ...values,
      imageFile: file,
    }

    setFormValues(formData)

    if (isEditMode) {
      const pictureId = modalValues.values._id
      if (!pictureId) {
        console.error('Picture ID is missing for edit mode')
        return
      }
      editPicture({
        id: pictureId,
        ...formData,
      } as EditPictureBody)
    } else {
      createPicture(formData as CreatePictureForm)
    }
  }

  return (
    <Modal
      title={
        title || (isEditMode ? 'Редактировать картину' : 'Добавить картину')
      }
      open={isOpen}
      onOk={() => form.submit()}
      onCancel={() => close()}
      confirmLoading={loading}
      okText="Сохранить"
      cancelText="Отмена"
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ available: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          label="Название"
          rules={[{ required: true, message: 'Введите название' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Описание">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item name="year" label="Год" rules={[{ required: true }]}>
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="material" label="Материал">
          <Input />
        </Form.Item>
        <Form.Item
          name="width"
          label="Ширина (см)"
          rules={[{ required: true }]}
        >
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="height"
          label="Высота (см)"
          rules={[{ required: true }]}
        >
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="available"
          label="Доступна к продаже"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item label="Изображение" required={!isEditMode}>
          <Form.Item
            name="imageFile"
            rules={
              isEditMode
                ? []
                : [
                    {
                      validator: () =>
                        file
                          ? Promise.resolve()
                          : Promise.reject('Загрузите изображение'),
                    },
                  ]
            }
            noStyle
          >
            <Upload
              beforeUpload={f => {
                setFile(f)
                form.validateFields(['imageFile'])
                return false
              }}
              onRemove={() => {
                setFile(null)
                form.validateFields(['imageFile'])
              }}
              maxCount={1}
              accept="image/*"
              listType="text"
            >
              <Button icon={<UploadOutlined />}>Выбрать файл</Button>
            </Upload>
          </Form.Item>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreatePictureModal
