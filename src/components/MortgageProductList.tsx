import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { DEFAULT_HEADERS } from '../consts';
import { Product } from '../types';

export function MortgageProductList({
  mortgages,
  title,
}: {
  mortgages: Product[];
  title: string;
}) {
  const { t } = useTranslation();
  const [sortedMortgages, setSortedMortgages] = useState(mortgages);
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const calculateSortedData = (sort: string) => {
    switch (sort) {
      case 'date':
      case 'date-descending':
        return sortedMortgages.sort(
          (a: Product, b: Product) =>
            new Date(a.updated).getTime() - new Date(b.updated).getTime(),
        );
      case 'best-rate':
      case 'best-ate-descending':
        return sortedMortgages.sort(
          (a: Product, b: Product) => a.bestRate - b.bestRate,
        );
      default:
        return mortgages;
    }
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sort = event.target.value;
    let sortedData = calculateSortedData(sort);
    if (sort.includes('descending')) {
      sortedData = sortedData.reverse();
    }
    setSortedMortgages([...sortedData]);
  };

  const handleStartApplication = (mortgageId: number) => {
    fetch('https://nesto-fe-exam.vercel.app/api/applications', {
      method: 'POST',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify({ productId: mortgageId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error');
        }
        navigate('/applications');
      })
      .catch(() => {
        setError(true);
      });
  };

  return (
    <section className="mortgage-products-list">
      <h2>{title}</h2>
      {mortgages.length > 1 && (
        <div className="flex flex-col gap-sm">
          <label htmlFor={`data-sort-${title}`}>{t('sort_by')}</label>
          <select
            id={`data-sort-${title}`}
            defaultValue="default"
            onChange={handleSortChange}>
            <option value="default">{t('default')}</option>
            <option value="date">{t('date_asc')}</option>
            <option value="date-descending">{t('date_desc')}</option>
            <option value="best-rate">{t('best_rate_asc')}</option>
            <option value="best-rate-descending">{t('best_rate_desc')}</option>
          </select>
        </div>
      )}

      <ul className="flex flex-col gap-md">
        {sortedMortgages.map((mortgage: Product) => (
          <li className="mortgage-product" key={mortgage.id}>
            <h3>{mortgage.name}</h3>
            <p>
              {t('rate')}: {mortgage.rate}
            </p>
            <p>
              {t('best_rate')}: {mortgage.bestRate}
            </p>
            <div className="flex gap-sm">
              {mortgage.insurable && (
                <span className="tag tag--blue">{t('insurable')}</span>
              )}
              {mortgage.restrictionsOption === 'NO_RESTRICTIONS' && (
                <span className="tag tag--blue">{t('no_restrictions')}</span>
              )}
              {mortgage.restrictionsOption === 'SOME_RESTRICTIONS' && (
                <span className="tag tag--yellow">
                  {t('some_restrictions')}
                </span>
              )}
              {mortgage.restrictionsOption === 'MORE_RESTRICTIONS' && (
                <span className="tag tag--red">{t('more_resctrictions')}</span>
              )}
              {mortgage.helocOption === 'HELOC_WITH' ? (
                <span className="tag tag--blue">{t('heloc_allowed')}</span>
              ) : (
                <span className="tag tag--red">{t('heloc_not_allowed')}</span>
              )}
            </div>
            <button onClick={() => handleStartApplication(mortgage.id)}>
              {t('apply')}
            </button>
            {error && <p>{t('error')}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
}
