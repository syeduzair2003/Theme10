import { apiGetCompanySliders } from '@/apis/page_optimization'
import SliderWrapper from './SliderWrapper'
import './companybanner.css'

interface Props {
  domain: string
  companyId: string
}

const CompanyBanner = async ({ domain, companyId }: Props) => {
  const companySliders = (await apiGetCompanySliders(companyId)).data;
  if (companySliders?.length > 0){
  return (
    <div className='banner-sections index-one overflow-hidden position-relative mx-2 mx-md-4 mx-xl-6 my-2 my-md-4 my-xl-6'>
      <div
        className="slider-container-wrapper"
        style={{
          width: '100%',
          // maxWidth: '1500px',
          height: '100%',
          margin: '0 auto',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '12px',
        }}
      >
        <SliderWrapper companySliders={companySliders} domain={domain} />
      </div>
    </div>
  )
  }
}

export default CompanyBanner
