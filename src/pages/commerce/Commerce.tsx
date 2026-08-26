import '@web/styles/Commerce.scss';
import csvFile from '@web/assets/data/data.csv?raw';

import Papa from 'papaparse';
import React, { useEffect, Dispatch, SetStateAction } from 'react';
import { useLocalStorage } from '@web/utils/customHook';

/**
 * Checkbox change handler
 */
function checkboxHandling(
  e: React.ChangeEvent<HTMLInputElement>,
  _status: Record<string, boolean>,
  setStatus: Dispatch<SetStateAction<Record<string, boolean>>>
) {
  const indexAttr = e.target.getAttribute('index');
  const index = indexAttr !== null ? Number(indexAttr) : -1;
  setStatus((prevStatus) => {
    return { ...prevStatus, [index]: e.target.checked };
  });
}

const parseCSV = (param: (records: string[][]) => void) => {
  Papa.parse(csvFile, {
    // header: true,
    skipEmptyLines: true,
    complete: function (input: Papa.ParseResult<string[]>) {
      const records = input.data as string[][];
      param(records);
    },
  });
};

const getImage = (imageName: string | undefined) => {
  const defaultUrl = new URL('../../assets/images/commerce/default.png', import.meta.url).href;
  if (!imageName) return defaultUrl;

  try {
    // Going up two levels to escape components/commerce/
    return new URL(`../../assets/images/commerce/${imageName}.png`, import.meta.url).href;
  } catch (err) {
    return defaultUrl;
  }
};

const splitterLine = [15, 29, 43];

interface TableProps {
  data: string[][] | null;
  status: Record<string | number, boolean>;
  setStatus: Dispatch<SetStateAction<Record<string | number, boolean>>>;
  setData?: Dispatch<SetStateAction<string[][] | null>>;
}

const Table: React.FC<TableProps> = (props) => {
  const { data, status, setStatus } = props;
  return (
    <>
      {data && data !== null ? (
        data.map((row, rowIndex) => {
          return (
            <React.Fragment key={rowIndex}>
              <div
                className={`table-cell table-checkbox${
                  splitterLine.includes(rowIndex - 1) ? ' table-splitter' : ''
                }${rowIndex === 0 ? ' table-corner--top-left' : ''}${rowIndex === data.length - 1 ? ' table-corner--bottom-left' : ''}`}
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
              {row &&
                row.map((value, index) => {
                  return (
                    <React.Fragment key={`${value}+${rowIndex}+${index}`}>
                      <div
                        className={`table-cell${
                          row.length - 1 === index ? ' table-description' : ''
                        }${rowIndex === 0 ? ' table-header' : ''}${
                          splitterLine.includes(rowIndex - 1) ? ` table-splitter` : ``
                        }${
                          row.length - 1 === index && rowIndex === 0
                            ? ' table-header-description table-corner--top-right'
                            : ''
                        }${rowIndex === data.length - 1 && index === row.length - 1 ? ' table-corner--bottom-right' : ''}`}
                      >
                        {value ?? ' '}
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
        })
      ) : (
        <></>
      )}
    </>
  );
};

const resetStatus = (
  e: React.MouseEvent<HTMLButtonElement>,
  setStatus: Dispatch<SetStateAction<Record<string, boolean>>>
) => {
  localStorage.removeItem('status');
  setStatus({});
};

const Commerce: React.FC = () => {
  const [data, setData] = useLocalStorage('csvData', null) as [string[][] | null, Dispatch<SetStateAction<string[][] | null>>];
  const [status, setStatus] = useLocalStorage('status', {}) as [Record<string, boolean>, Dispatch<SetStateAction<Record<string, boolean>>>];

  useEffect(() => {
    if (!data) {
      parseCSV(setData);
    }
    return () => {
      setData(null);
      setStatus({});
    };
  }, []);

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
        <Table data={data} status={status} setData={setData} setStatus={setStatus} />
      </div>

      <div className="util-copyrights">
        Originates from : 製作人–娜歐/小不點寶寶 協編–娜歐/蘑菇牛小排(Mo)
        <br />
        2023/7/2 Bo修正,7/5 Mo編修
        <br />
        <a href="https://forum.gamer.com.tw/C.php?bsn=7422&snA=241470" hrefLang="zh-tw" target="blank">
          https://forum.gamer.com.tw/C.php?bsn=7422&snA=241470
        </a>
      </div>
    </div>
  );
};

export default Commerce;
