import '@web/styles/Commerce.scss';
import csvFile from '@web/assets/data/data.csv?raw';

import Papa from 'papaparse';
import React, { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from 'react';
import Select from 'react-select';

/**
 * Checkbox change handler
 */
function checkboxHandling(
  e: React.ChangeEvent<HTMLInputElement>,
  _status: Record<string, boolean>,
  setStatus: Dispatch<SetStateAction<Record<string, boolean>>>,
) {
  const indexAttr = e.target.getAttribute('index');
  const index = indexAttr !== null ? Number(indexAttr) : -1;
  setStatus((prevStatus) => {
    return { ...prevStatus, [index]: e.target.checked };
  });
}

type CommerceRecord = Record<string, string>;

const parseCSV = (param: Dispatch<SetStateAction<CommerceRecord[] | null>>) => {
  Papa.parse<Record<string, string>>(csvFile, {
    header: true,
    skipEmptyLines: true,
    complete: function (input) {
      param(input.data);
    },
  });
};

const getImage = (imageName: string | undefined) => {
  const defaultUrl = new URL('../../assets/images/commerce/default.png', import.meta.url).href;
  if (!imageName) return defaultUrl;

  try {
    return new URL(`../../assets/images/commerce/${imageName}.png`, import.meta.url).href;
  } catch (err) {
    return defaultUrl;
  }
};

const splitterLine = [15, 29, 43];

interface TableProps {
  data: CommerceRecord[] | null;
  status: Record<string | number, boolean>;
  setStatus: Dispatch<SetStateAction<Record<string | number, boolean>>>;
  monthlyItems: Map<string, string[]>;
  selectedItems: Record<string, string>;
  onMonthlyItemChange: (position: string, item: string) => void;
}

const Table: React.FC<TableProps> = (props) => {
  const { data, status, setStatus, monthlyItems, selectedItems, onMonthlyItemChange } = props;
  const headers = data?.[0] ? Object.keys(data[0]).filter((header) => header !== '每月更換') : [];
  return (
    <>
      {data && data !== null ? (
        (() => {
          let currentPosition = '';
          return [null, ...data].map((row, rowIndex) => {
            if (row?.位置) {
              currentPosition = row.位置;
            }
            const values = row === null ? headers : headers.map((header) => row[header] ?? '');
            const position = currentPosition;
            const monthlyOptions = position ? monthlyItems.get(position) : undefined;
            return (
              <React.Fragment key={rowIndex}>
                <div
                  className={`table-cell table-checkbox${
                    splitterLine.includes(rowIndex - 1) ? ' table-splitter' : ''
                  }${rowIndex === 0 ? ' table-corner--top-left' : ''}${rowIndex === data.length ? ' table-corner--bottom-left' : ''}`}
                >
                  {rowIndex !== 0 ? (
                    <>
                      <input
                        id={`checkBox${rowIndex}`}
                        name={`checkBox${rowIndex}`}
                        type="checkbox"
                        // @ts-ignore
                        index={rowIndex}
                        checked={status[rowIndex] ?? false}
                        onChange={(e) => checkboxHandling(e, status, setStatus)}
                      />
                      <label htmlFor={`checkBox${rowIndex}`}></label>
                    </>
                  ) : (
                    '確認欄'
                  )}
                </div>
                {values.map((value, index) => {
                  return (
                    <React.Fragment key={`${value}+${rowIndex}+${index}`}>
                      <div
                        className={`table-cell${
                          values.length - 1 === index ? ' table-description' : ''
                        }${rowIndex === 0 ? ' table-header' : ''}${
                          splitterLine.includes(rowIndex - 1) ? ` table-splitter` : ``
                        }${
                          values.length - 1 === index && rowIndex === 0
                            ? ' table-header-description table-corner--top-right'
                            : ''
                        }${rowIndex === data.length && index === values.length - 1 ? ' table-corner--bottom-right' : ''}`}
                      >
                        {index === 1 && row?.每月更換?.toUpperCase() === 'TRUE' && value ? (
                          <Select
                            aria-label={`${position} 每月更換`}
                            className="commerce-select"
                            classNamePrefix="commerce-react-select"
                            options={monthlyOptions?.map((item) => ({ value: item, label: item })) ?? []}
                            value={{
                              value: selectedItems[position] ?? value,
                              label: selectedItems[position] ?? value,
                            }}
                            onChange={(option) => {
                              if (option) {
                                onMonthlyItemChange(position, option.value);
                              }
                            }}
                            isSearchable={false}
                            menuPlacement="auto"
                          />
                        ) : (
                          value || ' '
                        )}
                      </div>
                      {index === 2 && (
                        <div
                          className={`table-cell${
                            splitterLine.includes(rowIndex - 1) ? ' table-splitter' : ''
                          }${rowIndex === 0 ? ' table-header' : ''}`}
                        >
                          {rowIndex === 0 ? (
                            '圖'
                          ) : (
                            <img
                              alt={value}
                              src={getImage(value)}
                              onError={(e) => {
                                e.currentTarget.src = getImage('default');
                              }}
                            />
                          )}
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </React.Fragment>
            );
          });
        })()
      ) : (
        <></>
      )}
    </>
  );
};

const resetStatus = (
  _e: React.MouseEvent<HTMLButtonElement>,
  setStatus: Dispatch<SetStateAction<Record<string, boolean>>>,
) => {
  localStorage.removeItem('status');
  setStatus({});
};

const Commerce: React.FC = () => {
  const [data, setData] = useState<CommerceRecord[] | null>(null);
  const [selectedItems, setSelectedItems] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Record<string, boolean>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('csvData');
    if (savedData !== null) {
      setData(JSON.parse(savedData));
    } else {
      parseCSV(setData);
    }

    const savedStatus = localStorage.getItem('status');
    if (savedStatus !== null) {
      setStatus(JSON.parse(savedStatus));
    } else {
      setStatus({});
    }
    const savedSelections = localStorage.getItem('commerceSelections');
    if (savedSelections !== null) {
      setSelectedItems(JSON.parse(savedSelections));
    }
    setIsLoaded(true);

    return () => {
      setData(null);
      setStatus({});
    };
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('status', JSON.stringify(status));
    }
  }, [status, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('commerceSelections', JSON.stringify(selectedItems));
    }
  }, [selectedItems, isLoaded]);

  const positionGroups = useMemo(() => {
    const groups = new Map<string, { fixed: CommerceRecord[]; monthly: Map<string, CommerceRecord[]> }>();
    let position = '';
    let item = '';

    data?.forEach((record) => {
      if (record.位置) {
        position = record.位置;
      }
      if (record.貿易物品) {
        item = record.貿易物品;
      }
      if (!position) {
        return;
      }

      const group = groups.get(position) ?? {
        fixed: [] as CommerceRecord[],
        monthly: new Map<string, CommerceRecord[]>(),
      };
      if (record.每月更換?.toUpperCase() === 'TRUE') {
        const monthlyItem = group.monthly.get(item) ?? [];
        monthlyItem.push(record);
        group.monthly.set(item, monthlyItem);
      } else {
        group.fixed.push(record);
      }
      groups.set(position, group);
    });

    return groups;
  }, [data]);

  const monthlyItems = new Map<string, string[]>(
    [...positionGroups].map(([position, group]) => [position, [...group.monthly.keys()]]),
  );
  const visibleData = [...positionGroups].flatMap(([position, group]) => {
    const items = [...group.monthly.keys()];
    const selectedItem = items.includes(selectedItems[position]) ? selectedItems[position] : items[0];
    return [...group.fixed, ...(selectedItem ? (group.monthly.get(selectedItem) ?? []) : [])];
  });
  const handleMonthlyItemChange = (position: string, item: string) => {
    setSelectedItems((previous) => ({ ...previous, [position]: item }));
    setStatus({});
  };

  return (
    <div className="page-container">
      <div className="commerce-reminder">
        普通貿易限定: 偶數整點刷新: 2,4,6,8,10,12 分鐘: 00:00~00:06之間 偶數分鐘會刷新
        <br />
        路線要訣: 精靈村去科爾: 葉藍斯峽谷 用 近「葉」字左邊的橋
        <br />
        <button type="button" onClick={(e) => resetStatus(e, setStatus)} className="resetBtn">
          Reset Status
        </button>
      </div>

      <div className="table-container">
        <Table
          data={visibleData.length > 0 ? visibleData : null}
          status={status}
          setStatus={setStatus}
          monthlyItems={monthlyItems}
          selectedItems={Object.fromEntries(
            [...positionGroups].map(([position, group]) => [
              position,
              selectedItems[position] && group.monthly.has(selectedItems[position])
                ? selectedItems[position]
                : ([...group.monthly.keys()][0] ?? ''),
            ]),
          )}
          onMonthlyItemChange={handleMonthlyItemChange}
        />
      </div>

      <div className="util-copyrights">
        Originates from : 製作人–娜歐/小不點寶寶 協編–娜歐/蘑菇牛小排(Mo)
        <br />
        2023/7/2 Bo修正,7/5 Mo編修
        <br />
        <a href="https://forum.gamer.com.tw/C.php?bsn=7422&snA=241470" hrefLang="zh-tw" target="blank">
          https://forum.gamer.com.tw/C.php?bsn=7422&snA=241470
        </a>
        <br />
        2026/8/12 貿易改版賽季更新池來源
        <br />
        <a
          href="https://mabinogicnwiki.miraheze.org/wiki/%E7%89%88%E6%9C%AC%E6%9B%B4%E6%96%B0/2026%E5%B9%B48%E6%9C%8812%E6%97%A5/%E8%B4%B8%E6%98%93%E6%94%B9%E9%9D%A9#%E6%AF%8F%E6%9C%88%E7%AC%AC6%E9%98%B6%E6%AE%B5%E5%80%99%E9%80%89%E6%B1%A0"
          hrefLang="zh-tw"
          target="blank"
        >
          https://mabinogicnwiki.miraheze.org/wiki/%E7%89%88%E6%9C%AC%E6%9B%B4%E6%96%B0/2026%E5%B9%B48%E6%9C%8812%E6%97%A5/%E8%B4%B8%E6%98%93%E6%94%B9%E9%9D%A9#%E6%AF%8F%E6%9C%88%E7%AC%AC6%E9%98%B6%E6%AE%B5%E5%80%99%E9%80%8
          nine
        </a>
      </div>
    </div>
  );
};

export default Commerce;
