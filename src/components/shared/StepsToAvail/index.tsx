import React from 'react'
import "./stepstoavail.css"
import { apiGetStepsToAvail } from '@/apis/page_optimization';
import { faBriefcase, faUser, faWallet, FontAwesomeIcon } from '@/constants/icons';

interface Props {
    color: string;
    companyId: string;
    theme: string;
}
const icons: any = {
    0: faUser,
    1: faBriefcase,
    2: faWallet,
}
const themeCss: any = {
    'theme 1': '',
    'theme 2': 'f-12 lh-17 sp-3 fw-1',
    'theme 3': '',
}

const StepsToAvail = async ({ color, companyId, theme }: Props) => {
    const response = await apiGetStepsToAvail(companyId);
    const stepsToAvailResponse = response.data;
    const selected = theme.toLowerCase();
    const selectIcon = (i: number): any => {
        return icons[i] ? icons[i] : faUser;
    }
    const selectCss = (): string => {
        return themeCss[selected] ? themeCss[selected] : '';
        // return '';
    }

    if (stepsToAvailResponse?.length > 0) {
        return (
            <section className="steps-section" style={{ padding: "5% 8%" }}>
                <div className="container">
                <div className="steps-container">
                    <div className="row steps-row">
                        {stepsToAvailResponse.map((step, index) => (
                            <div className="col-xl-4 col-lg-4 p-3 " key={step.id}>
                                <div className={`step-box step-${index + 1}`}>
                                    <div className="step-content">
                                        <span className={`step-icon step-icon-${index + 1}`}>
                                            <i className={`${selectIcon(index)}`} ></i>
                                            <FontAwesomeIcon icon={selectIcon(index)} style={{ width: '16px', height: '16px', color: 'white' }} className='step-anim-icon'/>
                                        </span>
                                        <div className="step-text">
                                            <h3 className="step-title">{step.heading}</h3>
                                            <span className={`step-description ${selectCss()}`}>{step.text}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                </div>
            </section>
        )
    }
}

export default StepsToAvail
