import React from 'react';
import { FormButtons } from '../../../components/FormComponents';
import { CardTitle, HorizontalCard, LinkButton } from '../../../components/UIComponents'
import AboutMe from './AboutMe';
import AppointmentTime from './AppointmentTime';
import AboutCat from './AboutCat';
import Responsibilities from './Responsibilities';
import { useCatOwner } from './viewModel'

function CatOwnerInfo() {
  const {
    t,
    id,
    methods,
    FormProvider,
    onSubmit,
    resetForm,
    bookingOneDayProps,
    bookingOvernightProps,
    catProps
  } = useCatOwner();

  const { handleSubmit, watch, setValue } = methods;

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
        <LinkButton to={`/profile/catowner/${id}`}>
          <i className="fas fa-search mr-2" />
          {t('owner_form.view_profile')}
        </LinkButton>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HorizontalCard>
            <CardTitle> {t('owner_form.about_me')}</CardTitle>

            <AboutMe t={t} />
          </HorizontalCard>

          <HorizontalCard>
            <CardTitle>{t('owner_form.appointment')}</CardTitle>

            <h6 style={{ marginTop: 30 }}>{t('owner_form.one_day')}</h6>
            <AppointmentTime
              t={t}
              bookingOneDayProps={bookingOneDayProps}
              bookingOvernightProps={bookingOvernightProps}
            />
          </HorizontalCard>

          <HorizontalCard>
            <CardTitle>{t('owner_form.about_cat')}</CardTitle>
            <AboutCat
              t={t}
              setValue={setValue}
              watch={watch}
              catProps={catProps}
            />
          </HorizontalCard>

          <HorizontalCard>
            <CardTitle>{t('owner_form.cat_description')}</CardTitle>

            <Responsibilities t={t} />
          </HorizontalCard>

          <FormButtons onClick={resetForm} />
        </form>
      </FormProvider>
    </>
  );
}

export default CatOwnerInfo;