import React, { FunctionComponent } from 'react';
import {useRouter} from "next/router";
import Link from "next/link";

interface OwnProps {}

type Props = OwnProps;

const LocaleSwitcher: FunctionComponent<Props> = (props) => {
  const {locale: currentLocale, locales, query, pathname} = useRouter()
  return (<div>
      {locales?.map((locale, index) => {
          const label = locale.split('-')[0]
             return  currentLocale != locale ? <Link locale={locale} title={locale} key={locale} href={{pathname, query}} className={'text-black'}>
                  {label}
              </Link> : <span key={locale}>{label}</span>
      }
      )}
  </div>);
};

export default LocaleSwitcher;
