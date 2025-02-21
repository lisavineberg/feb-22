import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import { MortgageProductList } from './components/MortgageProductList';
import './i18n.ts';
import { Product } from './types';

const DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'x-nesto-candidat': 'Lisa Vineberg',
};

function App() {
  const { t } = useTranslation();

  const [variableMortgages, setVariableMortgages] = useState([]);
  const [fixedMortgages, setFixedMortgages] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('https://nesto-fe-exam.vercel.app/api/products', {
      headers: DEFAULT_HEADERS,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setVariableMortgages(
          data.filter((mortgage: Product) => mortgage.type === 'VARIABLE'),
        );
        setFixedMortgages(
          data.filter((mortgage: Product) => mortgage.type === 'FIXED'),
        );
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  return (
    <div>
      {variableMortgages.length > 0 || fixedMortgages.length > 0 ? (
        <div className="mortgage-products">
          {variableMortgages.length > 0 && (
            <MortgageProductList
              mortgages={variableMortgages}
              title={t('variable_mortgages')}
            />
          )}
          {fixedMortgages.length > 0 && (
            <MortgageProductList
              mortgages={fixedMortgages}
              title={t('fixed_mortgages')}
            />
          )}
        </div>
      ) : error ? (
        <p>{t('error')}</p>
      ) : (
        <p>{t('no_mortgages_found')}</p>
      )}
    </div>
  );
}

export default App;
