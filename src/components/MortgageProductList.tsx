import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Product } from '../types';

export function MortgageProductList({
  mortgages,
  title,
  setSelectedMortage,
}: {
  mortgages: Product[];
  title: string;
  setSelectedMortage: Function;
}) {
  const { t } = useTranslation();
  const [sortedMortgages, setSortedMortgages] = useState(mortgages);

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

  const handleOpenApplicationDialog = (mortgage: Product) => {
    const dialog = document.getElementById(
      'create-application',
    ) as HTMLDialogElement;
    if (dialog) {
      dialog.showModal();
      console.log(mortgage);
      setSelectedMortage(mortgage);
    }
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
            <button onClick={() => handleOpenApplicationDialog(mortgage)}>
              {t('apply')}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
