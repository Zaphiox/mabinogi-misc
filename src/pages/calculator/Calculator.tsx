import { useEffect, useState } from 'react';
import BasicSelect from '@web/component/BasicSelect';
import BasicControl from '@web/component/BasicControl';

import calConst from './calConst';
import { calculateResult, extractFormData } from './cal';

import '@web/styles/Calculator.scss';
import { Button, RadioGroup } from '@mui/material';

const Calculator = () => {
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [isLira, setIsLira] = useState<boolean>(true);
  const [result, setResult] = useState<any>(null);
  /**
   *
   * @param {React.BaseSyntheticEvent} event
   */
  function calculate(event) {
    event.preventDefault();
    let formValue = new FormData(event.currentTarget);
    const data = extractFormData(formValue);
    setIsSubmit(true);
    const calculated = calculateResult(data);
    setResult({
      ...calculated,
    });
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 150);
  }

  function onChangeInstrument(opt) {
    setIsLira(Number(opt.value) === 22 || Number(opt.value) === 25);
  }
  const isOptionDisabled = (option) => {
    return !isLira && Number(option.value) === 0.055;
  };
  useEffect(() => {
    return () => {};
  }, [isLira]);

  return (
    <>
      <div className="calPage-container">
        <h3 className="post-title">[Mabinogi] 戰場的序曲 效果計算</h3>
        <div className="calculator">
          <div className="card">
            <form onSubmit={calculate}>
              <div className="group col-3">
                <span className="group-legend">技能</span>
                <BasicSelect id="battleSkill" options={calConst.battleSkillOptions} />
                <BasicSelect id="playSkill" options={calConst.playSkillOptions} />
                <BasicSelect id="singSkill" options={calConst.singSkillOptions} />
              </div>
              <div className="group-split"></div>
              <div className="group">
                <span className="group-legend">樂器</span>
                <BasicSelect id="instrumentPrefix" options={calConst.instrumentPrefixOptions} defaultSelect={1} />
                <BasicSelect id="instrumentSuffix" options={calConst.instrumentSuffixOptions} defaultSelect={1} />
                <BasicSelect
                  id="instrument"
                  options={calConst.instrumentBaseOptions}
                  defaultSelect={1}
                  onChange={onChangeInstrument}
                />
                <BasicSelect id="reforgingPlayEffect" options={calConst.reforgingPlayEffectOptions} defaultSelect={6} />
                <div className="sub-group col-3">
                  <BasicSelect id="reforgingNormal" options={calConst.reforgingNormalOptions} />
                  <BasicSelect id="reforgingExcellent" options={calConst.reforgingExcellentOptions} />
                  <BasicSelect id="reforgingInspiring" options={calConst.reforgingInspiringOptions} defaultSelect={4} />
                </div>
              </div>
              <div className="group-split"></div>
              <div className="group">
                <span className="group-legend">飾品 1</span>
                <BasicSelect id="accessory1Prefix" options={calConst.accessoryPrefixOptions} defaultSelect={1} />
                <BasicSelect id="accessory1Suffix" options={calConst.accessorySuffixOptions} defaultSelect={1} />
                <div className="sub-group col-3">
                  <BasicSelect id="accessory1ReforgingNormal" options={calConst.accessoryReforgeNormalOptions} />
                  <BasicSelect id="accessory1ReforgingExcellent" options={calConst.accessoryReforgeExcellentOptions} />
                  <BasicSelect
                    id="accessory1ReforgingInspiring"
                    options={calConst.accessoryReforgeInspiringOptions}
                    defaultSelect={2}
                  />
                </div>
              </div>
              <div className="group">
                <span className="group-legend">飾品 2</span>
                <BasicSelect id="accessory2Prefix" options={calConst.accessoryPrefixOptions} defaultSelect={1} />
                <BasicSelect id="accessory2Suffix" options={calConst.accessorySuffixOptions} defaultSelect={1} />
                <div className="sub-group col-3">
                  <BasicSelect id="accessory2ReforgingNormal" options={calConst.accessoryReforgeNormalOptions} />
                  <BasicSelect id="accessory2ReforgingExcellent" options={calConst.accessoryReforgeExcellentOptions} />
                  <BasicSelect
                    id="accessory2ReforgingInspiring"
                    options={calConst.accessoryReforgeInspiringOptions}
                    defaultSelect={2}
                  />
                </div>
              </div>
              <div className="group-split"></div>
              <div className="group">
                <span className="group-legend">裝備</span>
                <BasicSelect id="headPrefix" options={calConst.headPrefixOptions} defaultSelect={0} />
                <BasicSelect id="headSuffix" options={calConst.headSuffixOptions} defaultSelect={1} />
                <BasicSelect id="bodyPrefix" options={calConst.bodyPrefixOptions} defaultSelect={3} />
                <BasicSelect id="bodySuffix" options={calConst.bodySuffixOptions} />
                <BasicSelect id="handPrefix" options={calConst.handPrefixOptions} defaultSelect={3} />
                <BasicSelect id="handSuffix" options={calConst.handSuffixOptions} />
                <BasicSelect id="footPrefix" options={calConst.footPrefixOptions} defaultSelect={3} />
                <BasicSelect id="footSuffix" options={calConst.footSuffixOptions} />
                <BasicSelect id="wingPrefix" options={calConst.wingPrefixOptions} defaultSelect={1} />
                <BasicSelect id="wingSufix" options={calConst.wingSuffixOptions} />
              </div>
              <div className="group-split"></div>
              <div className="group">
                <span className="group-legend">宗師 / 稱號</span>
                <BasicControl
                  id="master"
                  label="開啓一代宗師吟遊詩人效果"
                  defaultChecked={true}
                  controlMethod="switch"
                />
                <BasicControl id="arcana" label="開啓聖詠者同步效果" controlMethod="switch" />
                <BasicSelect id="title" options={calConst.titleOptions} defaultSelect={1} />
                <BasicSelect id="secondTitle" options={calConst.secondTitleOptions} defaultSelect={5} />
              </div>
              <div className="group-split"></div>
              <div className="group">
                <div className="group-legend">農場</div>
                <div className="sub-group">
                  <BasicControl
                    id="farmTool"
                    label="寵物小屋 ：雲朵坐墊(4階段)"
                    defaultChecked={true}
                    controlMethod="switch"
                  />
                </div>
                <BasicSelect id="farmModel" options={calConst.farmModelOptions} defaultSelect={3} />
                <BasicSelect id="extraFarmModel" options={calConst.extraFarmModelOptions} defaultSelect={2} />
              </div>
              <div className="group-split"></div>
              <div className="group">
                <div className="group-legend">套裝 / 特殊效果 / 寵物</div>
                <BasicControl id="couple" label="玫瑰情侶手鍊 / 水晶婚戒" controlMethod="switch" />
                <BasicControl id="silkWing" label="特別的優雅絲緞翅膀" controlMethod="switch" />
                <BasicSelect id="setEffect" options={calConst.setEffectOptions} defaultSelect={1} />
                <BasicSelect id="fluaCrown" options={calConst.fluaCrownOptions} />
                <BasicSelect id="fairyDragon" options={calConst.fairyDragonOptions} />
                <BasicSelect
                  id="specialUpgrade"
                  options={calConst.specialUpgradeOptions}
                  isOptionDisabled={isOptionDisabled}
                />
                <BasicSelect id="muliasHolyWater" options={calConst.muliasHolyWaterOptions} />
              </div>
              <div className="group-split"></div>
              <div className="group">
                <div className="group-legend">雜項</div>
                <BasicControl id="astro" label="戀人卡" controlMethod="switch" />
                <BasicControl id="potion" label="音樂強化藥水" controlMethod="switch" />
                <div className="sub-group">
                  <RadioGroup row defaultValue="0" name="doll">
                    <BasicControl value="0" controlMethod="radio" label="無背包" />
                    <BasicControl value="1" controlMethod="radio" label="杜巴頓名流 / 塔拉王城舞會組合娃娃背包" />
                    <BasicControl value="2" controlMethod="radio" label="秘法火焰組合娃娃背包" />
                  </RadioGroup>
                </div>
                <div className="sub-group">
                  <RadioGroup defaultValue={0} row name="bugle">
                    <BasicControl value="0" controlMethod="radio" label="無喇叭" defaultChecked={true} />
                    <BasicControl value="3" controlMethod="radio" label="柯勒斐雷的喇叭" />
                    <BasicControl value="5" controlMethod="radio" label="柯勒斐雷的大喇叭" />
                  </RadioGroup>
                </div>
                <BasicControl id="isecho" label="音效回音(只影響歌唱)" controlMethod="switch" />
              </div>
              <div className="button-container">
                <Button variant="contained" color="secondary" type="submit" style={{ padding: '5px 25px' }}>
                  計算
                </Button>
              </div>
            </form>
            {isSubmit && (
              <div className="result-panel">
                <div className="panel">
                  <span className="panel-title">普通演奏</span>
                  <div className="panel-content">
                    <span className="left">歌唱 : </span>
                    <span>{result?.singNormal?.toFixed(2)}%</span>
                  </div>
                  <div className="panel-content">
                    <span className="left">樂器演奏 : </span>
                    <span>{result?.playNormal?.toFixed(2)}%</span>
                  </div>
                </div>
                <div className="panel">
                  <span className="panel-title">優秀演奏</span>
                  <div className="panel-content">
                    <span className="left">歌唱 : </span>
                    <span>{result?.singExcellent?.toFixed(2)}%</span>
                  </div>
                  <div className="panel-content">
                    <span className="left">樂器演奏 : </span>
                    <span>{result?.playExcellent?.toFixed(2)}%</span>
                  </div>
                </div>
                <div className="panel">
                  <span className="panel-title">天籟之音演奏</span>
                  <div className="panel-content">
                    <span className="left">歌唱 : </span>
                    <span>{result?.singInspiring?.toFixed(2)}%</span>
                  </div>
                  <div className="panel-content">
                    <span className="left">樂器演奏 : </span>
                    <span>{result?.playInspiring?.toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="util-copyrights">
          Originates from :
          <a
            href="https://ccroxx.blogspot.com/2019/07/mabinogi-battlefield-effect.html"
            hrefLang="zh-tw"
            target="blank"
          >
            https://ccroxx.blogspot.com/2019/07/mabinogi-battlefield-effect.html
          </a>
        </div>
      </div>
    </>
  );
};

export default Calculator;
