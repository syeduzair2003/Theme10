import React from 'react'
import DefaultLayout from '@theme1/theme1Layout';
import Theme2Layout from '@theme2/theme2Layout';
import Theme3Layout from '@theme3/theme3Layout';
import theme4Layout from '@theme4/theme4Layout';
import theme5Layout from '@theme5/theme5Layout';
import theme6Layout from '@theme6/theme6Layout';
import theme8Layout from '@theme8/theme8Layout';
import theme9Layout from '@theme9/theme9Layout';
import { Template } from '@/services/dataTypes';

interface Props {
    children: React.ReactNode;
    template: Template;
}

const ThemeSwitcher = async ({ children, template }: Props) => {

    const selector = (theme: string): any => {
        switch (theme?.trim()?.toLowerCase()) {
            case 'theme 1':
                return DefaultLayout;
            case 'theme 2':
                return Theme2Layout;
            case 'theme 3':
                return Theme3Layout;
            case 'theme 4':
                return theme4Layout;
            case 'theme 5':
                return theme5Layout;
            case 'theme 6':
                return theme6Layout;
            case 'theme 8':
                return theme8Layout;    
            case 'theme 9':
                return theme9Layout;    
            default:
                return Theme3Layout;
        }
    }
    // const SelectedLayout = selector(template?.name);
    //switching theme manually
    const SelectedLayout = selector('theme 9');
    return (
        <SelectedLayout>
            {children}
        </SelectedLayout>
    )
}

export default ThemeSwitcher
