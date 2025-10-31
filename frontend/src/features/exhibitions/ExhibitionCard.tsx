import React from 'react'
import { Card, Button, Popconfirm, message } from 'antd'
import { useUnit } from 'effector-react'
import { $user } from '@/shared/model/auth'
import { modalController } from './create'
import { exhibitionsApi } from '@/shared/api/exhibitions'
import { fetchExhibitionsFx } from '@/entities/exhibition/model/fetch'
import { Exhibition } from '@/shared/api/exhibitions'

type ExhibitionCardProps = {
  exhibition: Exhibition
  variant?: 'upcoming' | 'archive'
  formattedDates: string
  year: string
}

const { setTitle, setValues, open } = modalController

const ExhibitionCard: React.FC<ExhibitionCardProps> = ({
  exhibition,
  variant = 'archive',
  formattedDates,
  year,
}) => {
  const user = useUnit($user)
  const isUpcoming = variant === 'upcoming'

  const onEditClick = () => {
    setTitle('Редактировать выставку')
    setValues({
      values: {
        name: exhibition.name,
        description: exhibition.description || '',
        startDate: exhibition.startDate,
        endDate: exhibition.endDate,
        location: exhibition.location,
        _id: exhibition._id,
      },
      mode: 'EDIT',
    })
    open()
  }

  const onDelete = async () => {
    try {
      await exhibitionsApi.remove(exhibition._id)
      message.success('Выставка удалена')
      fetchExhibitionsFx()
    } catch (e) {
      message.error('Не удалось удалить')
    }
  }

  const backgroundColor = isUpcoming ? 'rgba(154, 3, 30, 0.06)' : '#f9fafb'

  return (
    <Card
      style={{
        backgroundColor: backgroundColor,
        borderLeft: `3.6px solid ${isUpcoming ? 'var(--color-accent)' : 'var(--color-gray-200)'}`,
        borderRadius: 0,
        borderTop: 'none',
        borderRight: 'none',
        borderBottom: 'none',
      }}
      bodyStyle={{
        padding: '24px 24px 24px 28px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: backgroundColor,
      }}
    >
      <div style={{ flex: 1 }}>
        <div
          style={{
            color: isUpcoming ? 'var(--color-accent)' : '#1e2939',
            fontFamily: 'var(--font-sans)',
            fontSize: 16,
            lineHeight: '24px',
            marginBottom: 8,
          }}
        >
          {exhibition.name}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div
            style={{
              color: 'var(--color-text-muted)',
              fontSize: 16,
              lineHeight: '24px',
            }}
          >
            {exhibition.location}
          </div>
          <div
            style={{
              color: 'var(--color-text-muted)',
              fontSize: 16,
              lineHeight: '24px',
            }}
          >
            {formattedDates}
          </div>
        </div>
        {user && (
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <Button size="small" onClick={onEditClick}>
              Редактировать
            </Button>
            <Popconfirm
              title="Удалить выставку?"
              onConfirm={onDelete}
              okText="Да"
              cancelText="Нет"
            >
              <Button size="small" danger>
                Удалить
              </Button>
            </Popconfirm>
          </div>
        )}
      </div>
      <div
        style={{
          color: isUpcoming ? 'var(--color-accent)' : 'var(--color-subtext)',
          fontFamily: 'var(--font-sans)',
          fontWeight: 700,
          fontSize: 24,
          lineHeight: '32px',
        }}
      >
        {year}
      </div>
    </Card>
  )
}

export default ExhibitionCard
