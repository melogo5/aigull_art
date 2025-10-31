import React, { useEffect } from 'react'
import { Button } from 'antd'
import { useUnit } from 'effector-react'
import HeadingTitle from '@/shared/ui/HeadingTitle'
import ExhibitionCard from '@/features/exhibitions/ExhibitionCard'
import {
  fetchExhibitions,
  $exhibitions,
  $exhibitionsLoading,
} from '@/entities/exhibition/model/fetch'
import { $user } from '@/shared/model/auth'
import {
  modalController,
  CreateExhibitionModal,
} from '@/features/exhibitions/create'
import { formatDateRangeToRussian } from '@/shared/utils/formatDate'
import { Exhibition } from '@/shared/api/exhibitions'

const { setTitle, setValues, open } = modalController

export const ExhibitionsPage: React.FC = () => {
  const user = useUnit($user)
  const exhibitions = useUnit($exhibitions)
  const loading = useUnit($exhibitionsLoading)

  useEffect(() => {
    fetchExhibitions()
  }, [])

  const now = new Date()
  const upcoming = exhibitions.filter(ex => new Date(ex.endDate) >= now)
  const archive = exhibitions.filter(ex => new Date(ex.endDate) < now)

  const handleCreateClick = () => {
    setTitle('Создание выставки')
    setValues({
      mode: 'CREATE',
      values: {},
    })
    open()
  }

  return (
    <div className="container">
      <HeadingTitle title="Выставки" />
      {user && (
        <div
          style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}
        >
          <Button type="primary" onClick={handleCreateClick}>
            Добавить выставку
          </Button>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: 40 }}>Загрузка...</div>
      ) : (
        <>
          {upcoming.length > 0 && (
            <section className="mb-4">
              <h2
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 16,
                  lineHeight: '24px',
                  color: 'var(--color-accent)',
                }}
              >
                Предстоящие
              </h2>
              <div
                className="mt-3"
                style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
              >
                {upcoming.map((exhibition: Exhibition) => {
                  const year = new Date(exhibition.startDate)
                    .getFullYear()
                    .toString()
                  const formattedDates = formatDateRangeToRussian(
                    exhibition.startDate,
                    exhibition.endDate
                  )
                  return (
                    <ExhibitionCard
                      key={exhibition._id}
                      variant="upcoming"
                      exhibition={exhibition}
                      formattedDates={formattedDates}
                      year={year}
                    />
                  )
                })}
              </div>
            </section>
          )}

          {archive.length > 0 && (
            <section>
              <h2
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 16,
                  lineHeight: '24px',
                }}
              >
                Архив
              </h2>
              <div
                className="mt-3"
                style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
              >
                {archive.map((exhibition: Exhibition) => {
                  const year = new Date(exhibition.startDate)
                    .getFullYear()
                    .toString()
                  const formattedDates = formatDateRangeToRussian(
                    exhibition.startDate,
                    exhibition.endDate
                  )
                  return (
                    <ExhibitionCard
                      key={exhibition._id}
                      exhibition={exhibition}
                      formattedDates={formattedDates}
                      year={year}
                    />
                  )
                })}
              </div>
            </section>
          )}
        </>
      )}
      <CreateExhibitionModal />
    </div>
  )
}

export default ExhibitionsPage
