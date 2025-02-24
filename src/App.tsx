import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MortgageProductList } from './components/MortgageProductList';
import { DEFAULT_HEADERS } from './consts';
import { ProductSchema } from './schemas';
import { Product } from './types';

function App() {
  const { t } = useTranslation();

  const [variableMortgages, setVariableMortgages] = useState<Product[]>([]);
  const [fixedMortgages, setFixedMortgages] = useState<Product[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('https://nesto-fe-exam.vercel.app/api/products', {
      headers: DEFAULT_HEADERS,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const variableSet = new Set<Product>();
        const fixedSet = new Set<Product>();

        data.forEach((product: Product) => {
          const result = ProductSchema.safeParse(product);

          if (result.success) {
            if (product.type === 'VARIABLE') {
              variableSet.add(product);
            } else if (product.type === 'FIXED') {
              fixedSet.add(product);
            }
          } else {
            console.error(result.error);
          }
        });

        setVariableMortgages(Array.from(variableSet));
        setFixedMortgages(Array.from(fixedSet));
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  return (
    <div>
      {variableMortgages.length > 0 || fixedMortgages.length > 0 ? (
        <div className="mortgage-products" data-testid="mortgage-products">
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
