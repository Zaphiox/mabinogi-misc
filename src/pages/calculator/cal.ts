import { switchConst, type Option } from './calConst';

const extractFormData = (formData: any[] | FormData) => {
  const data: any = {};
  for (const [name, value] of formData.entries()) {
    if (name === 'profileSelector') continue;
    if (typeof value === 'string') {
      data[name] = !isNaN(Number(value)) && value.trim() !== '' ? Number(value) : value;
    } else {
      data[name] = value;
    }
  }
  checkSwitches(data);
  return data;
};

const checkSwitches = (data: { [x: string]: string }) => {
  for (let key in switchConst) {
    data[key] ??= 'off';
  }
};

interface PerformanceScores {
  singNormal: number;
  playNormal: number;
  singExcellent: number;
  playExcellent: number;
  singInspiring: number;
  playInspiring: number;
}

const calculateResult = (data): PerformanceScores => {
  const battle = data.battleSkill;
  const fairyDragonChoice = data.fairyDragon;
  const fairyDragonBase = fairyDragonChoice !== 0 ? 3 : 0;
  const fairyDragonBuff = fairyDragonChoice === 'A' ? battle * 0.02 : 0;

  let switchBuff = 0;
  for (const key in data) {
    if (!Object.hasOwn(data, key) || typeof data[key] === 'number' || key === 'fairyDragon') continue;
    if (data[key] === 'on') switchBuff += switchConst[key];
  }

  const playBuff =
    Number(
      Object.values(data).reduce((acc: number, val) => {
        return typeof val === 'number' && val >= 1 ? acc + val : acc;
      }, 0),
    ) +
    fairyDragonBase +
    switchBuff -
    data.battleSkill;
  const singBuff =
    playBuff -
    data.instrument -
    data.instrumentPrefix -
    data.instrumentSuffix -
    (data.isecho === 'on' ? 0 : data.reforgingPlayEffect);
  const basePlay = battle * (1 + playBuff * 0.01);
  const baseSing = battle * (1 + singBuff * 0.01);

  const normalSing = 1 + data.accessory1ReforgingNormal + data.accessory2ReforgingNormal;
  const excellentSing = 1.1 + data.accessory1ReforgingExcellent + data.accessory2ReforgingExcellent;
  const inspiringSing = 1.3 + data.accessory1ReforgingInspiring + data.accessory2ReforgingInspiring;

  const normalPlay = normalSing + data.reforgingNormal;
  const excellentPlay = excellentSing + data.reforgingExcellent;
  const inspiringPlay = inspiringSing + data.reforgingInspiring;

  const rating = data.instrument === 25 || data.instrument === 22 ? 0.07 : 0;
  const extra = 1 + rating + data.specialUpgrade;
  const singNomral = baseSing * normalSing + fairyDragonBuff;
  const singExcellent = baseSing * excellentSing + fairyDragonBuff;
  const singInspiring = baseSing * inspiringSing + fairyDragonBuff;

  const playNomral = (basePlay * normalPlay + fairyDragonBuff) * extra;
  const playExcellent = (basePlay * excellentPlay + fairyDragonBuff) * extra;
  const playInspiring = (basePlay * inspiringPlay + fairyDragonBuff) * extra;

  return {
    singNormal: singNomral,
    playNormal: playNomral,
    singExcellent: singExcellent,
    playExcellent: playExcellent,
    singInspiring: singInspiring,
    playInspiring: playInspiring,
  };
};

const readProfileSwitch = (val: string): boolean => val === 'on';

const getSelectedValue = (selectedValue: number, options: Option[]) => {
  const index = options.findIndex((val) => typeof val.value === 'number' && val.value === selectedValue);
  return index === -1 ? 0 : index;
};

export { extractFormData, calculateResult, readProfileSwitch, getSelectedValue };
