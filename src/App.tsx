import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CreateApplication } from './components/CreateApplication';
import { MortgageProductList } from './components/MortgageProductList';
import { DEFAULT_HEADERS } from './consts';
import { Product } from './types';

function App() {
  const { t } = useTranslation();

  const [selectedMortage, setSelectedMortage] = useState<Product | null>(null);
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
              setSelectedMortage={setSelectedMortage}
            />
          )}
          {fixedMortgages.length > 0 && (
            <MortgageProductList
              mortgages={fixedMortgages}
              title={t('fixed_mortgages')}
              setSelectedMortage={setSelectedMortage}
            />
          )}
          <CreateApplication selectedMortgage={selectedMortage} />
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
