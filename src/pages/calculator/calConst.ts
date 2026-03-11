export interface Option {
  value: string | number;
  label: string;
  id?: string;
  isDisabled?: boolean;
}
const battleSkillOptions: Option[] = [
  { value: 20, label: '技能：戰場序曲 R1' },
  { value: 19, label: '技能：戰場序曲 R2' },
  { value: 18, label: '技能：戰場序曲 R3' },
  { value: 17, label: '技能：戰場序曲 R4' },
  { value: 16, label: '技能：戰場序曲 R5' },
  { value: 16, label: '技能：戰場序曲 R6' },
  { value: 15, label: '技能：戰場序曲 R7' },
  { value: 15, label: '技能：戰場序曲 R8' },
  { value: 14, label: '技能：戰場序曲 R9' },
  { value: 14, label: '技能：戰場序曲 RA' },
  { value: 13, label: '技能：戰場序曲 RB' },
  { value: 13, label: '技能：戰場序曲 RC' },
  { value: 12, label: '技能：戰場序曲 RD' },
  { value: 12, label: '技能：戰場序曲 RE' },
  { value: 11, label: '技能：戰場序曲 RF' },
  { value: 10, label: '技能：戰場序曲 練習' },
];

const playSkillOptions: Option[] = [
  { value: 15, label: '技能：樂器演奏 R1' },
  { value: 14, label: '技能：樂器演奏 R2' },
  { value: 13, label: '技能：樂器演奏 R3' },
  { value: 12, label: '技能：樂器演奏 R4' },
  { value: 11, label: '技能：樂器演奏 R5' },
  { value: 10, label: '技能：樂器演奏 R6' },
  { value: 9, label: '技能：樂器演奏 R7' },
  { value: 8, label: '技能：樂器演奏 R8' },
  { value: 7, label: '技能：樂器演奏 R9' },
  { value: 6, label: '技能：樂器演奏 RA' },
  { value: 5, label: '技能：樂器演奏 RB' },
  { value: 4, label: '技能：樂器演奏 RC' },
  { value: 3, label: '技能：樂器演奏 RD' },
  { value: 2, label: '技能：樂器演奏 RE' },
  { value: 1, label: '技能：樂器演奏 RF' },
  { value: 0, label: '技能：樂器演奏 練習' },
];

const singSkillOptions: Option[] = [
  { value: 15, label: '技能：歌唱 R1' },
  { value: 14, label: '技能：歌唱 R2' },
  { value: 13, label: '技能：歌唱 R3' },
  { value: 12, label: '技能：歌唱 R4' },
  { value: 11, label: '技能：歌唱 R5' },
  { value: 10, label: '技能：歌唱 R6' },
  { value: 9, label: '技能：歌唱 R7' },
  { value: 8, label: '技能：歌唱 R8' },
  { value: 7, label: '技能：歌唱 R9' },
  { value: 6, label: '技能：歌唱 RA' },
  { value: 5, label: '技能：歌唱 RB' },
  { value: 4, label: '技能：歌唱 RC' },
  { value: 3, label: '技能：歌唱 RD' },
  { value: 2, label: '技能：歌唱 RE' },
  { value: 1, label: '技能：歌唱 RF' },
  { value: 0, label: '技能：歌唱 練習' },
];

const instrumentBaseOptions: Option[] = [
  { value: 0, label: '樂器：無增益效果' },
  { value: 25, label: '樂器：靈魂解放者里拉 (+25)' },
  { value: 22, label: '樂器：靈魂解放者里拉 (+22)' },
  { value: 16, label: '樂器：惡魔黑色星期天 (+16)' },
  { value: 10, label: '樂器：里拉 (+10)' },
  { value: 8, label: '樂器：普通樂器 (+8)' },
];

const instrumentPrefixOptions: Option[] = [
  { value: 0, label: '樂器接頭：無相關賦予' },
  { value: 7, label: '樂器接頭：複調 (+7)' },
  { value: 6, label: '樂器接頭：複調 (+6)' },
  { id: 'Polyphony5', value: 5, label: '樂器接頭：複調 (+5)' },
  { id: 'Ensemble', value: 5, label: '樂器接頭：融合 (+5)' },
  { value: 4, label: '樂器接頭：複調 (+4)' },
  { value: 3, label: '樂器接頭：快板 / 開心的 (+3)' },
  { value: 2, label: '樂器接頭：中板 (+2)' },
  { value: 1, label: '樂器接頭：行板 (+1)' },
];

const instrumentSuffixOptions: Option[] = [
  { value: 0, label: '樂器接尾：無相關賦予' },
  { value: 3, label: '樂器接尾：節拍 (+3)' },
  { value: 2, label: '樂器接尾：節拍 (+2)' },
  { value: 1, label: '樂器接尾：和音 (+1)' },
];

const reforgingPlayEffectOptions: Option[] = [
  { value: 0, label: '細工 樂器演奏效果：無' },
  { value: 25, label: '細工 樂器演奏效果 25等級' },
  { value: 24, label: '細工 樂器演奏效果 24等級' },
  { value: 23, label: '細工 樂器演奏效果 23等級' },
  { value: 22, label: '細工 樂器演奏效果 22等級' },
  { value: 21, label: '細工 樂器演奏效果 21等級' },
  { value: 20, label: '細工 樂器演奏效果 20等級' },
  { value: 19, label: '細工 樂器演奏效果 19等級' },
  { value: 18, label: '細工 樂器演奏效果 18等級' },
  { value: 17, label: '細工 樂器演奏效果 17等級' },
  { value: 16, label: '細工 樂器演奏效果 16等級' },
  { value: 15, label: '細工 樂器演奏效果 15等級' },
  { value: 14, label: '細工 樂器演奏效果 14等級' },
  { value: 13, label: '細工 樂器演奏效果 13等級' },
  { value: 12, label: '細工 樂器演奏效果 12等級' },
  { value: 11, label: '細工 樂器演奏效果 11等級' },
  { value: 10, label: '細工 樂器演奏效果 10等級' },
  { value: 9, label: '細工 樂器演奏效果 9等級' },
  { value: 8, label: '細工 樂器演奏效果 8等級' },
  { value: 7, label: '細工 樂器演奏效果 7等級' },
  { value: 6, label: '細工 樂器演奏效果 6等級' },
  { value: 5, label: '細工 樂器演奏效果 5等級' },
  { value: 4, label: '細工 樂器演奏效果 4等級' },
  { value: 3, label: '細工 樂器演奏效果 3等級' },
  { value: 2, label: '細工 樂器演奏效果 2等級' },
  { value: 1, label: '細工 樂器演奏效果 1等級' },
];

const reforgingNormalOptions: Option[] = [
  { value: 0, label: '細工 普通效果：無' },
  { value: 0.13, label: '細工 普通效果 13等級' },
  { value: 0.12, label: '細工 普通效果 12等級' },
  { value: 0.11, label: '細工 普通效果 11等級' },
  { value: 0.1, label: '細工 普通效果 10等級' },
  { value: 0.09, label: '細工 普通效果 9等級' },
  { value: 0.08, label: '細工 普通效果 8等級' },
  { value: 0.07, label: '細工 普通效果 7等級' },
  { value: 0.06, label: '細工 普通效果 6等級' },
  { value: 0.05, label: '細工 普通效果 5等級' },
  { value: 0.04, label: '細工 普通效果 4等級' },
  { value: 0.03, label: '細工 普通效果 3等級' },
  { value: 0.02, label: '細工 普通效果 2等級' },
  { value: 0.01, label: '細工 普通效果 1等級' },
];

const reforgingExcellentOptions: Option[] = [
  { value: 0, label: '細工 優秀效果：無' },
  { value: 0.13, label: '細工 優秀效果 13等級' },
  { value: 0.12, label: '細工 優秀效果 12等級' },
  { value: 0.11, label: '細工 優秀效果 11等級' },
  { value: 0.1, label: '細工 優秀效果 10等級' },
  { value: 0.09, label: '細工 優秀效果 9等級' },
  { value: 0.08, label: '細工 優秀效果 8等級' },
  { value: 0.07, label: '細工 優秀效果 7等級' },
  { value: 0.06, label: '細工 優秀效果 6等級' },
  { value: 0.05, label: '細工 優秀效果 5等級' },
  { value: 0.04, label: '細工 優秀效果 4等級' },
  { value: 0.03, label: '細工 優秀效果 3等級' },
  { value: 0.02, label: '細工 優秀效果 2等級' },
  { value: 0.01, label: '細工 優秀效果 1等級' },
];

const reforgingInspiringOptions: Option[] = [
  { value: 0, label: '細工 天籟效果：無' },
  { value: 0.13, label: '細工 天籟效果 13等級' },
  { value: 0.12, label: '細工 天籟效果 12等級' },
  { value: 0.11, label: '細工 天籟效果 11等級' },
  { value: 0.1, label: '細工 天籟效果 10等級' },
  { value: 0.09, label: '細工 天籟效果 9等級' },
  { value: 0.08, label: '細工 天籟效果 8等級' },
  { value: 0.07, label: '細工 天籟效果 7等級' },
  { value: 0.06, label: '細工 天籟效果 6等級' },
  { value: 0.05, label: '細工 天籟效果 5等級' },
  { value: 0.04, label: '細工 天籟效果 4等級' },
  { value: 0.03, label: '細工 天籟效果 3等級' },
  { value: 0.02, label: '細工 天籟效果 2等級' },
  { value: 0.01, label: '細工 天籟效果 1等級' },
];

const accessoryPrefixOptions: Option[] = [
  { value: 0, label: '飾品 接頭：無相關賦予' },
  { value: 2, label: '飾品 接頭：活潑的 (+2)' },
  { value: 1, label: '飾品 接頭：行板 / 活潑的 (+1)' },
];

const accessorySuffixOptions: Option[] = [
  { value: 0, label: '飾品 接尾：無相關賦予' },
  { value: 1, label: '飾品 接尾：裝飾樂段 (+1)' },
];

const accessoryReforgeNormalOptions: Option[] = [
  { value: 0, label: '飾品 細工 普通效果：無' },
  { value: 0.04, label: '飾品 細工 普通效果 4等級' },
  { value: 0.03, label: '飾品 細工 普通效果 3等級' },
  { value: 0.02, label: '飾品 細工 普通效果 2等級' },
  { value: 0.01, label: '飾品 細工 普通效果 1等級' },
];

const accessoryReforgeExcellentOptions: Option[] = [
  { value: 0, label: '飾品 細工 優秀效果：無' },
  { value: 0.04, label: '飾品 細工 優秀效果 4等級' },
  { value: 0.03, label: '飾品 細工 優秀效果 3等級' },
  { value: 0.02, label: '飾品 細工 優秀效果 2等級' },
  { value: 0.01, label: '飾品 細工 優秀效果 1等級' },
];

const accessoryReforgeInspiringOptions: Option[] = [
  { value: 0, label: '飾品 細工 天籟效果：無' },
  { value: 0.04, label: '飾品 細工 天籟效果 4等級' },
  { value: 0.03, label: '飾品 細工 天籟效果 3等級' },
  { value: 0.02, label: '飾品 細工 天籟效果 2等級' },
  { value: 0.01, label: '飾品 細工 天籟效果 1等級' },
];

const headPrefixOptions: Option[] = [{ value: 0, label: '頭部接頭：無相關賦予' }];

const headSuffixOptions: Option[] = [
  { value: 0, label: '頭部接尾：無相關賦予' },
  { value: 3, label: '頭部接尾：合唱 (+3)' },
  { value: 2, label: '頭部接尾：合唱 (+2)' },
];

const bodyPrefixOptions: Option[] = [
  { value: 0, label: '身體接頭：無相關賦予' },
  { value: 8, label: '身體接頭：清雅的 (+8)' },
  { value: 7, label: '身體接頭：清雅的 (+7)' },
  { value: 6, label: '身體接頭：清雅的 / 奏鳴曲 (+6)' },
  { value: 5, label: '身體接頭：清雅的 / 奏鳴曲 (+5)' },
  { value: 4, label: '身體接頭：清雅的 / 奏鳴曲 (+4)' },
  { value: 3, label: '身體接頭：清雅的 / 安可 (+3)' },
];
const bodySuffixOptions: Option[] = [
  { value: 0, label: '身體接尾：無相關賦予' },
  { value: 3, label: '身體接尾：輕聲細語 (+3)' },
  { value: 2, label: '身體接尾：輕聲細語 (+2)' },
  { value: 1, label: '身體接尾：輕聲細語 (+1)' },
];

const handPrefixOptions: Option[] = [
  { value: 0, label: '手部接頭：無相關賦予' },
  { value: 4, label: '手部接頭：技巧的 (+4)' },
  { value: 3, label: '手部接頭：技巧的 (+3)' },
  { value: 2, label: '手部接頭：技巧的 / 獨奏 (+2)' },
  { value: 1, label: '手部接頭：技巧的 (+1)' },
];
const handSuffixOptions: Option[] = [
  { value: 0, label: '手部接尾：無相關賦予' },
  { value: 2, label: '手部接尾：音樂家 (+2)' },
  { value: 1, label: '手部接尾：音樂家 (+1)' },
];

const footPrefixOptions: Option[] = [
  { value: 0, label: '腳部接頭：無相關賦予' },
  { value: 4, label: '腳部接頭：技巧的 (+4)' },
  { value: 3, label: '腳部接頭：技巧的 (+3)' },
  { value: 2, label: '腳部接頭：技巧的 / 獨奏 (+2)' },
  { value: 1, label: '腳部接頭：技巧的 (+1)' },
];

const footSuffixOptions: Option[] = [
  { value: 0, label: '腳部接尾：無相關賦予' },
  { value: 2, label: '腳部接尾：音樂家 (+2)' },
  { value: 1, label: '腳部接尾：音樂家 (+1)' },
];

const wingPrefixOptions: Option[] = [
  { value: 0, label: '翅膀接頭：無相關賦予' },
  { value: 5, label: '翅膀接頭：艾伊洛 / 伊卡洛斯 (+5)' },
  { value: 4, label: '翅膀接頭：伊卡洛斯 (+4)' },
  { value: 3, label: '翅膀接頭：伊卡洛斯 (+3)' },
  { value: 2, label: '翅膀接頭：伊卡洛斯 (+2)' },
];
const wingSuffixOptions: Option[] = [{ value: 0, label: '翅膀接尾：無相關賦予' }];
const titleOptions: Option[] = [
  { value: 0, label: '稱號：無相關' },
  { value: 8, label: '稱號：戰場的序曲大師 (+8)' },
  { value: 5, label: '稱號：音樂家 (+5)' },
];

const secondTitleOptions: Option[] = [
  { value: 0, label: '第二稱號：無相關' },
  { value: 13, label: '二稱：歐哈德 (+13, 有祕法)' },
  { value: 12, label: '二稱：特別的夢幻之花 (+12)' },
  { id: 'Eochaid', value: 11, label: '二稱：歐哈德 (+11, 無祕法)' },
  { id: 'Teacup', value: 11, label: '二稱：特別甜蜜的皇家茶杯組合 (+11)' },
  { id: 'SubjectTheta', value: 11, label: '二稱：黃色變異體碎片 (+11)' },
  { id: 'RestPattern', value: 10, label: '二稱：休憩的圖樣 (+10)' },
  { id: 'RoyalPenguin', value: 10, label: '二稱：皇家企鵝/朋友 (+10)' },
  { id: 'PurpleBard', value: 9, label: '二稱：特殊紫色的吟遊詩人 (+9)' },
  { id: 'Strongest', value: 9, label: '二稱：極強的 / 跟卡泰爾一起 (+9)' },
  { id: 'Mared', value: 8, label: '二稱：摩勒愛德 (+8)' },
  { id: 'Multi8', value: 8, label: '二稱：里葆娜 / DIVA / 強而有力的 / 梅溫 (+8)' },
  { id: 'AnotherMulti8', value: 8, label: '二稱：特別太陽光彩 / 特別闇黑氣息 (+8)' },
  { value: 7, label: '二稱：極弱的 / 娜歐特派員 (+7)' },
  { id: 'DarkAura', value: 5, label: '二稱：闇黑氣息 (+5)' },
  { value: 5, label: '二稱：夢幻和音 / 梅溫 (+5)' },
  { value: 4, label: '二稱：米羅舞兒 (+4)' },
  { id: 'Messy', value: 3, label: '二稱：網路勝利組-希美拉達 / 亂成一團 (+3)' },
  { id: 'Vocaloid', value: 3, label: '二稱：初音未來 / 靜音鈴 / 鏡音連 / KAITO (+3)' },
  { id: 'Blizzard', value: 3, label: '二稱：特別暴風雪 / 特別刺骨寒風 (+3)' },
  { id: 'ErinnVTuber', value: 3, label: '二稱：紅色歐若拉 / 愛爾琳網紅 (+3)' },
  { id: 'RedStar', value: 3, label: '二稱：特殊光明的紅星 (+3)' },
  { id: 'SpotLight', value: 2, label: '二稱：奇幻聚光燈 / 秘密奇幻聚光燈 (+2)' },
  { id: 'BarbarianSpotLight', value: 2, label: '二稱：野蠻人聚光燈 / 秘密野蠻人聚光燈 (+2)' },
  { id: 'Snow', value: 2, label: '二稱：特別雪花煙火 / 特別鵝毛大雪 (+2)' },
  { id: '11YearStar', value: 2, label: '二稱：11週年夢幻之星 / 特別超級明星 (+2)' },
  { id: 'Multi2', value: 2, label: '二稱：彩虹歐若拉 / 伊拉 / 梅樂 / 伊菲 (+2)' },
  { id: 'Zodiac', value: 2, label: '二稱：特殊與星座同行 (+2)' },
  { value: 1, label: '二稱：人氣王 (+1)' },
];

const farmModelOptions: Option[] = [
  { value: 0, label: '農場模型：無相關' },
  { value: 5, label: '農場模型：浪漫農場特殊場景傑作 Vol.4 (+5)' },
  { value: 4, label: '農場模型：歐哈德模型 (+4)' },
  { id: 'fernModel', value: 3, label: '農場模型：特別的費倫模型 (+3)' },
  { id: 'JudgeDervla', value: 3, label: '農場模型：審問官黛伊爾布拉模型 (+3)' },
  { id: 'secretGarden', value: 3, label: '農場模型：特別祕密花園隱密的噴水池 (+3)' },
  { id: 'hillwenEngineer', value: 3, label: '農場模型：浪漫農場稀原工程師的研究室 (+3)' },
  { id: 'springGarden', value: 3, label: '農場模型：春天花園噴泉 (+3)' },
  { id: 'Dervla', value: 2, label: '農場模型：黛伊爾布拉模型 (+2)' },
  { id: 'kart', value: 1, label: '農場模型：跑跑卡丁車睏寶模型(黃色) (+1)' },
  { id: 'cherrBlossom', value: 1, label: '農場模型：大櫻花樹 (+1)' },
];

const extraFarmModelOptions: Option[] = [
  { value: 0, label: '額外農場模型：無相關' },
  { value: 4, label: '額外農場模型：浪漫農場雛菊特別飾品 (+4)' },
  { value: 3, label: '額外農場模型：莎伊芙特別模型 (+3)' },
  { id: 'siyuExtra', value: 2, label: '額外農場模型：詩又特別模型 (+2)' },
  { id: 'irusanAltar', value: 2, label: '額外農場模型：伊魯夏的祭壇 (+2)' },
  { value: 1, label: '額外農場模型：夢幻回憶黃金獎盃 (+1)' },
];

const muliasHolyWaterOptions: Option[] = [
  { value: 0, label: '穆里亞斯聖水：無相關' },
  { value: 7, label: '穆里亞斯聖水：(+7)' },
  { value: 6, label: '穆里亞斯聖水：(+6)' },
  { value: 5, label: '穆里亞斯聖水：(+5)' },
  { value: 4, label: '穆里亞斯聖水：(+4)' },
  { value: 3, label: '穆里亞斯聖水：(+3)' },
  { value: 2, label: '穆里亞斯聖水：(+2)' },
  { value: 1, label: '穆里亞斯聖水：(+1)' },
];

const fluaCrownOptions: Option[] = [
  { value: 0, label: '芙露亞的草葉頭冠：無' },
  { value: 4, label: '芙露亞的草葉頭冠 (+4)' },
  { value: 3, label: '芙露亞的草葉頭冠 (+3)' },
  { value: 2, label: '芙露亞的草葉頭冠 (+2)' },
];

const specialUpgradeOptions: Option[] = [
  { value: 0, label: 'SR特殊改造：無' },
  { value: 0.005, label: '特殊改造：SR 1' },
  { value: 0.01, label: '特殊改造：SR 2' },
  { value: 0.015, label: '特殊改造：SR 3' },
  { value: 0.023, label: '特殊改造：SR 4' },
  { value: 0.03, label: '特殊改造：SR 5' },
  { value: 0.038, label: '特殊改造：SR 6' },
  { value: 0.045, label: '特殊改造：SR 7' },
  { value: 0.055, label: '特殊改造：SR 8', isDisabled: true },
];

const setEffectOptions: Option[] = [
  { value: 0, label: '套裝效果：無' },
  { value: 5, label: '熾天使歌唱手部裝飾 (+5)' },
  { value: 3, label: '特別的吟遊詩人浪漫服裝 (+3)' },
];

const fairyDragonOptions: Option[] = [
  { value: 0, label: '寵物精靈龍在場：無' },
  { value: 'A', label: '精靈龍：紅炎的精靈龍' },
  { value: 'B', label: '精靈龍：翠草/蒼冰/原初的精靈龍' },
];

const exportObj = {
  battleSkillOptions,
  playSkillOptions,
  singSkillOptions,
  instrumentBaseOptions,
  instrumentPrefixOptions,
  instrumentSuffixOptions,
  reforgingPlayEffectOptions,
  reforgingExcellentOptions,
  reforgingNormalOptions,
  reforgingInspiringOptions,
  accessoryPrefixOptions,
  accessorySuffixOptions,
  accessoryReforgeNormalOptions,
  accessoryReforgeExcellentOptions,
  accessoryReforgeInspiringOptions,
  headPrefixOptions,
  headSuffixOptions,
  bodyPrefixOptions,
  bodySuffixOptions,
  handPrefixOptions,
  handSuffixOptions,
  footPrefixOptions,
  footSuffixOptions,
  wingPrefixOptions,
  wingSuffixOptions,
  titleOptions,
  secondTitleOptions,
  farmModelOptions,
  extraFarmModelOptions,
  muliasHolyWaterOptions,
  fluaCrownOptions,
  setEffectOptions,
  fairyDragonOptions,
  specialUpgradeOptions,
};

export const switchConst = {
  master: 5,
  arcana: 3,
  astro: 2,
  farmTool: 1,
  couple: 1,
  silkWing: 1,
  potion: 1,
  isecho: 0,
};

export interface savedProfile {
  label: string;
  value: string;
}

export const updateProfileList = (savedProfile: savedProfile[], profiles: any) => {
  for (const key in profiles) {
    savedProfile.push({
      label: key,
      value: key,
    });
  }
  return savedProfile;
};
export default exportObj;
