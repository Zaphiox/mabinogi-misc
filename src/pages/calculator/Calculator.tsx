import { useEffect, useState } from 'react';
import BasicSelect from '@web/component/BasicSelect';
import BasicControl from '@web/component/BasicControl';

import calConst, { updateProfileList, type savedProfile } from './calConst';
import { calculateResult, extractFormData, getSelectedValue, readProfileSwitch } from './cal';

import '@web/styles/Calculator.scss';
import { Button, RadioGroup, TextField } from '@mui/material';
import { useLocalStorage } from '@web/utils/customHook';
import { isEmptyOrSpaces } from '@web/utils/miscUtils';

const Calculator = () => {
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [isLira, setIsLira] = useState<boolean>(true);
  const [result, setResult] = useState<any>(null);
  const [selectedProfile, setSelectedProfile] = useState<string>('');
  const [profiles, setProfiles] = useLocalStorage('calProfile', {});
  const [savedProfile, setSavedProfile] = useState<savedProfile[]>(profiles);

  const formKey = selectedProfile ? `profile:${selectedProfile}` : 'profile:__default__';
  const current = selectedProfile && profiles[selectedProfile] ? profiles[selectedProfile] : undefined;

  const loadProfile = () => {
    const selected = document.querySelector('input[name="profileSelector"]') as HTMLInputElement;
    if (isEmptyOrSpaces(selected.value)) {
      alert('cannot load empty profile');
      return;
    }
    setIsSubmit(false);
    setResult(null);
    setSelectedProfile(selected.value);
  };

  useEffect(() => {
    setSavedProfile(updateProfileList([], profiles));
    return () => {
      setSavedProfile([]);
    };
  }, []);
  useEffect(() => {
    if (!isSubmit && selectedProfile !== '') return () => {};
  }, [selectedProfile]);
  useEffect(() => {
    if (isSubmit) setSavedProfile(updateProfileList([], profiles));
    const profileName = document.querySelector('input[name="profile"]') as HTMLInputElement;
    if (!isSubmit && !isEmptyOrSpaces(profileName.value)) setSavedProfile(updateProfileList([], profiles));
    return () => {
      setSavedProfile([]);
    };
  }, [isSubmit]);

  function onChangeInstrument(opt) {
    setIsLira(Number(opt.value) === 22 || Number(opt.value) === 25);
  }
  const isOptionDisabled = (option) => {
    return !isLira && Number(option.value) === 0.055;
  };

  function calculate(event: React.BaseSyntheticEvent) {
    event.preventDefault();
    const submitter: string = (event.nativeEvent as any).submitter.id;
    let formValue = new FormData(event.currentTarget);
    const data = extractFormData(formValue);
    if (submitter === 'save' && !isEmptyOrSpaces(data.profile)) {
      setIsSubmit(false);
      profiles[data.profile] = data;
      setProfiles({ ...profiles });
      setSavedProfile(updateProfileList([], profiles));
      return;
    } else if (submitter === 'save') {
      alert('profile name cannot be empty');
      return;
    }
    setIsSubmit(true);
    const calculated = calculateResult(data);
    setResult({
      ...calculated,
    });
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 150);
  }

  return (
    <>
      <div className="calPage-container">
        <h3 className="post-title">[Mabinogi] 戰場的序曲 效果計算</h3>
        <div className="calculator">
          <div className="card">
            <form key={formKey} onSubmit={calculate}>
              <div className="group">
                <TextField
                  id="profile"
                  name="profile"
                  label="Profile"
                  variant="filled"
                  defaultValue={selectedProfile ? selectedProfile : ''}
                />
                <BasicSelect
                  id="profileSelector"
                  options={savedProfile}
                  placeholder="選擇 Profile"
                  defaultSelect={-1}
                />
              </div>
              <div className="button-container">
                <Button
                  id="loadProfile"
                  variant="contained"
                  color="primary"
                  type="button"
                  style={{ padding: '5px 25px', marginLeft: '10px' }}
                  onClick={loadProfile}
                >
                  載入
                </Button>
                <Button
                  id="loadProfile"
                  variant="contained"
                  color="error"
                  type="button"
                  style={{ padding: '5px 25px', marginLeft: '10px' }}
                  onClick={() => {
                    if (confirm('是否清空所有 profile?')) {
                      setProfiles({});
                      setSavedProfile([]);
                      window.location.reload();
                    }
                  }}
                >
                  清空Profile
                </Button>
              </div>
              <div className="group col-3">
                <span className="group-legend">技能</span>
                <BasicSelect
                  id="battleSkill"
                  options={calConst.battleSkillOptions}
                  defaultSelect={current ? getSelectedValue(current?.battleSkill, calConst.battleSkillOptions) : 0}
                />
                <BasicSelect id="playSkill" options={calConst.playSkillOptions} />
                <BasicSelect id="singSkill" options={calConst.singSkillOptions} />
              </div>
              <div className="group-split"></div>
              <div className="group">
                <span className="group-legend">樂器</span>
                <BasicSelect
                  id="instrumentPrefix"
                  options={calConst.instrumentPrefixOptions}
                  defaultSelect={
                    current ? getSelectedValue(current?.instrumentPrefix, calConst.instrumentPrefixOptions) : 1
                  }
                />
                <BasicSelect
                  id="instrumentSuffix"
                  options={calConst.instrumentSuffixOptions}
                  defaultSelect={
                    current ? getSelectedValue(current?.instrumentSuffix, calConst.instrumentSuffixOptions) : 1
                  }
                />
                <BasicSelect
                  id="instrument"
                  options={calConst.instrumentBaseOptions}
                  defaultSelect={current ? getSelectedValue(current?.instrument, calConst.instrumentBaseOptions) : 1}
                  onChange={onChangeInstrument}
                />
                <BasicSelect
                  id="reforgingPlayEffect"
                  options={calConst.reforgingPlayEffectOptions}
                  defaultSelect={
                    current ? getSelectedValue(current?.reforgingPlayEffect, calConst.reforgingPlayEffectOptions) : 6
                  }
                />
                <div className="sub-group col-3">
                  <BasicSelect
                    id="reforgingNormal"
                    options={calConst.reforgingNormalOptions}
                    defaultSelect={
                      current ? getSelectedValue(current?.reforgingNormal, calConst.reforgingNormalOptions) : 0
                    }
                  />

                  <BasicSelect
                    id="reforgingExcellent"
                    options={calConst.reforgingExcellentOptions}
                    defaultSelect={
                      current ? getSelectedValue(current?.reforgingExcellent, calConst.reforgingExcellentOptions) : 0
                    }
                  />

                  <BasicSelect
                    id="reforgingInspiring"
                    options={calConst.reforgingInspiringOptions}
                    defaultSelect={
                      current ? getSelectedValue(current?.reforgingInspiring, calConst.reforgingInspiringOptions) : 4
                    }
                  />
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
                <BasicSelect
                  id="headPrefix"
                  options={calConst.headPrefixOptions}
                  defaultSelect={current ? getSelectedValue(current?.headPrefix, calConst.headPrefixOptions) : 0}
                />
                <BasicSelect
                  id="headSuffix"
                  options={calConst.headSuffixOptions}
                  defaultSelect={current ? getSelectedValue(current?.headSuffix, calConst.headSuffixOptions) : 1}
                />
                <BasicSelect
                  id="bodyPrefix"
                  options={calConst.bodyPrefixOptions}
                  defaultSelect={current ? getSelectedValue(current?.bodyPrefix, calConst.bodyPrefixOptions) : 3}
                />
                <BasicSelect
                  id="bodySuffix"
                  options={calConst.bodySuffixOptions}
                  defaultSelect={current ? getSelectedValue(current?.bodySuffix, calConst.bodySuffixOptions) : 0}
                />
                <BasicSelect
                  id="handPrefix"
                  options={calConst.handPrefixOptions}
                  defaultSelect={current ? getSelectedValue(current?.handPrefix, calConst.handPrefixOptions) : 3}
                />
                <BasicSelect
                  id="handSuffix"
                  options={calConst.handSuffixOptions}
                  defaultSelect={current ? getSelectedValue(current?.handSuffix, calConst.handSuffixOptions) : 0}
                />
                <BasicSelect
                  id="footPrefix"
                  options={calConst.footPrefixOptions}
                  defaultSelect={current ? getSelectedValue(current?.footPrefix, calConst.footPrefixOptions) : 3}
                />
                <BasicSelect
                  id="footSuffix"
                  options={calConst.footSuffixOptions}
                  defaultSelect={current ? getSelectedValue(current?.footSuffix, calConst.footSuffixOptions) : 0}
                />
                <BasicSelect
                  id="wingPrefix"
                  options={calConst.wingPrefixOptions}
                  defaultSelect={current ? getSelectedValue(current?.wingPrefix, calConst.wingPrefixOptions) : 1}
                />
                <BasicSelect
                  id="wingSuffix"
                  options={calConst.wingSuffixOptions}
                  defaultSelect={current ? getSelectedValue(current?.wingSuffix, calConst.wingSuffixOptions) : 0}
                />
              </div>
              <div className="group-split"></div>
              <div className="group">
                <span className="group-legend">宗師 / 稱號</span>
                <BasicControl
                  id="master"
                  label="開啓一代宗師吟遊詩人效果"
                  defaultChecked={current ? readProfileSwitch(current?.master) : true}
                  controlMethod="switch"
                />
                <BasicControl
                  id="arcana"
                  label="開啓聖詠者同步效果"
                  controlMethod="switch"
                  defaultChecked={current ? readProfileSwitch(current?.arcana) : false}
                />
                <BasicSelect
                  id="title"
                  options={calConst.titleOptions}
                  defaultSelect={current ? getSelectedValue(current?.title, calConst.titleOptions) : 1}
                />
                <BasicSelect
                  id="secondTitle"
                  options={calConst.secondTitleOptions}
                  defaultSelect={current ? getSelectedValue(current?.secondTitle, calConst.secondTitleOptions) : 5}
                />
              </div>
              <div className="group-split"></div>
              <div className="group">
                <div className="group-legend">農場</div>
                <div className="sub-group">
                  <BasicControl
                    id="farmTool"
                    label="寵物小屋 ：雲朵坐墊(4階段)"
                    defaultChecked={current ? readProfileSwitch(current?.farmTool) : true}
                    controlMethod="switch"
                  />
                </div>
                <BasicSelect
                  id="farmModel"
                  options={calConst.farmModelOptions}
                  defaultSelect={current ? getSelectedValue(current?.farmModel, calConst.farmModelOptions) : 3}
                />
                <BasicSelect
                  id="extraFarmModel"
                  options={calConst.extraFarmModelOptions}
                  defaultSelect={
                    current ? getSelectedValue(current?.extraFarmModel, calConst.extraFarmModelOptions) : 2
                  }
                />
              </div>
              <div className="group-split"></div>
              <div className="group">
                <div className="group-legend">套裝 / 特殊效果 / 寵物</div>
                <BasicControl
                  id="couple"
                  label="玫瑰情侶手鍊 / 水晶婚戒"
                  controlMethod="switch"
                  defaultChecked={current ? readProfileSwitch(current?.couple) : true}
                />
                <BasicControl
                  id="silkWing"
                  label="特別的優雅絲緞翅膀"
                  controlMethod="switch"
                  defaultChecked={current ? readProfileSwitch(current?.silkWing) : false}
                />
                <BasicSelect
                  id="setEffect"
                  options={calConst.setEffectOptions}
                  defaultSelect={current ? getSelectedValue(current?.setEffect, calConst.setEffectOptions) : 1}
                />
                <BasicSelect
                  id="fluaCrown"
                  options={calConst.fluaCrownOptions}
                  defaultSelect={current ? getSelectedValue(current?.fluaCrown, calConst.fluaCrownOptions) : 0}
                />
                <BasicSelect
                  id="fairyDragon"
                  options={calConst.fairyDragonOptions}
                  defaultSelect={current ? getSelectedValue(current?.fairyDragon, calConst.fairyDragonOptions) : 0}
                />
                <BasicSelect
                  id="specialUpgrade"
                  options={calConst.specialUpgradeOptions}
                  defaultSelect={
                    current ? getSelectedValue(current?.specialUpgrade, calConst.specialUpgradeOptions) : 0
                  }
                  isOptionDisabled={isOptionDisabled}
                />
                <BasicSelect
                  id="muliasHolyWater"
                  options={calConst.muliasHolyWaterOptions}
                  defaultSelect={
                    current ? getSelectedValue(current?.muliasHolyWater, calConst.muliasHolyWaterOptions) : 0
                  }
                />
              </div>
              <div className="group-split"></div>
              <div className="group">
                <div className="group-legend">雜項</div>
                <BasicControl
                  id="astro"
                  label="戀人卡"
                  controlMethod="switch"
                  defaultChecked={current ? readProfileSwitch(current?.astro) : false}
                />
                <BasicControl
                  id="potion"
                  label="音樂強化藥水"
                  controlMethod="switch"
                  defaultChecked={current ? readProfileSwitch(current?.potion) : false}
                />
                <div className="sub-group">
                  <RadioGroup row defaultValue={current ? current?.doll : 0} name="doll">
                    <BasicControl value="0" controlMethod="radio" label="無背包" />
                    <BasicControl value="1" controlMethod="radio" label="杜巴頓名流 / 塔拉王城舞會組合娃娃背包" />
                    <BasicControl value="2" controlMethod="radio" label="秘法火焰組合娃娃背包" />
                  </RadioGroup>
                </div>
                <div className="sub-group">
                  <RadioGroup defaultValue={current ? current?.bugle : 0} row name="bugle">
                    <BasicControl value="0" controlMethod="radio" label="無喇叭" defaultChecked={true} />
                    <BasicControl value="3" controlMethod="radio" label="柯勒斐雷的喇叭" />
                    <BasicControl value="5" controlMethod="radio" label="柯勒斐雷的大喇叭" />
                  </RadioGroup>
                </div>
                <BasicControl
                  id="isecho"
                  label="音效回音(只影響歌唱)"
                  controlMethod="switch"
                  defaultChecked={current ? readProfileSwitch(current?.isecho) : false}
                />
              </div>
              <div className="button-container">
                <Button id="submit" variant="contained" color="secondary" type="submit" style={{ padding: '5px 25px' }}>
                  計算
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  id="save"
                  style={{ padding: '5px 25px', marginLeft: '10px' }}
                >
                  儲存
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
          <br />
        </div>
      </div>
    </>
  );
};

export default Calculator;
