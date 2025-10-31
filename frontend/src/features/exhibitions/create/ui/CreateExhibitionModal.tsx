import React, { useEffect } from 'react'
import {
  Modal,
  Form,
  Input,
  DatePicker,
  FormProps,
} from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { useUnit } from 'effector-react'
import {
  createExhibitionFx,
  createExhibition,
} from '../model/create'
import { editExhibitionFx, editExhibition } from '../model/edit'
import { modalController } from '../model/modal'
import { setFormValues } from '../model/form'
import { EditExhibitionBody, CreateExhibitionForm } from '@/shared/api/exhibitions'
import 'dayjs/locale/ru'

dayjs.locale('ru')

const { $isOpen, $title, $values, close } = modalController

export const CreateExhibitionModal: React.FC = () => {
  const [form] = Form.useForm<CreateExhibitionForm & { dates: [Dayjs, Dayjs] }>()

  const [
    isOpen,
    title,
    modalValues,
    createPending,
    updatePending,
  ] = useUnit([
    $isOpen,
    $title,
    $values,
    createExhibitionFx.pending,
    editExhibitionFx.pending,
  ])
  const isEditMode = modalValues.mode === 'EDIT'
  const loading = createPending || updatePending

  useEffect(() => {
    const initialValues = modalValues.values as EditExhibitionBody & { _id?: string }
    if (isOpen && Object.keys(initialValues).length && initialValues.startDate) {
      form.setFieldsValue({
        name: initialValues.name,
        description: initialValues.description || '',
        location: initialValues.location,
        dates: [
          dayjs(initialValues.startDate),
          dayjs(initialValues.endDate),
        ],
      })
    } else {
      form.resetFields()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, modalValues])

  const onFinish: FormProps['onFinish'] = values => {
    const formData = {
      name: values.name,
      description: values.description || '',
      startDate: values.dates[0].toISOString(),
      endDate: values.dates[1].toISOString(),
      location: values.location,
    }

    setFormValues(formData)

    if (isEditMode) {
      const exhibitionId = modalValues.values._id
      if (!exhibitionId) {
        console.error('Exhibition ID is missing for edit mode')
        return
      }
      editExhibition({
        id: exhibitionId,
        ...formData,
      } as EditExhibitionBody & { id: string })
    } else {
      createExhibition(formData as CreateExhibitionForm)
    }
  }

  return (
    <Modal
      title={
        title || (isEditMode ? 'Редактировать выставку' : 'Добавить выставку')
      }
      open={isOpen}
      onOk={() => form.submit()}
      onCancel={() => close()}
      confirmLoading={loading}
      okText="Сохранить"
      cancelText="Отмена"
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
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
        <Form.Item
          name="location"
          label="Место проведения"
          rules={[{ required: true, message: 'Введите место проведения' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="dates"
          label="Даты проведения"
          rules={[{ required: true, message: 'Выберите даты' }]}
        >
          <DatePicker.RangePicker
            style={{ width: '100%' }}
            format="DD.MM.YYYY"
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateExhibitionModal

