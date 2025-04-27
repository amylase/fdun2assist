export type Category = '武器' | '防具' | '腕輪' | '飛び道具' | '食料' | '草' | '薬' | '巻物' | '杖' | '魔石';
type ItemData = {
    category: Category;
    name: string;
    probability: number;
    isIdentifiable: boolean;
}

// ---- 武器 ----
type WeaponData = ItemData & typeof _weapons[number] & {
    category: '武器';
    isIdentifiable: false;
};
const _weapons = [
    {
        "name": "枝",
        "probability": 0.01325077
    },
    {
        "name": "こん棒",
        "probability": 0.01987588
    },
    {
        "name": "青銅の剣",
        "probability": 0.01987618
    },
    {
        "name": "鉄の剣",
        "probability": 0.01325136
    },
    {
        "name": "白銀の剣",
        "probability": 0.00795078
    },
    {
        "name": "名刀朧月夜",
        "probability": 0.00397527
    },
    {
        "name": "群雲の剣",
        "probability": 0.00265038
    },
    {
        "name": "草薙の剣",
        "probability": 0.0006625699999999999
    },
    {
        "name": "* 神剣",
        "probability": 6.56e-06
    },
    {
        "name": "超重量の剣",
        "probability": 0.00397551
    },
    {
        "name": "血吸い太刀",
        "probability": 0.00397533
    },
    {
        "name": "悪魔の剣",
        "probability": 0.00397533
    },
    {
        "name": "辻斬り一刀",
        "probability": 0.00053006
    },
    {
        "name": "つるはし",
        "probability": 0.00530022
    },
    {
        "name": "三段斬りの剣",
        "probability": 0.0026500800000000004
    },
    {
        "name": "名剣燕返し",
        "probability": 0.0026500800000000004
    },
    {
        "name": "秘剣礫弾き",
        "probability": 0.0026501400000000005
    },
    {
        "name": "気合の剣",
        "probability": 0.0026500800000000004
    },
    {
        "name": "紫電の刃",
        "probability": 0.00132519
    },
    {
        "name": "魔剣雫斬り",
        "probability": 0.0026501400000000005
    },
    {
        "name": "風立の剣",
        "probability": 0.0026500800000000004
    },
    {
        "name": "賢者の剣",
        "probability": 0.0013250100000000002
    },
    {
        "name": "奇跡の剣",
        "probability": 0.0013251299999999999
    },
    {
        "name": "窮鼠の牙",
        "probability": 0.00013244
    },
    {
        "name": "徒党崩し",
        "probability": 6.634e-05
    },
    {
        "name": "伝説の剣（偽物）",
        "probability": 0.00066251
    },
    {
        "name": "伝説の剣（本物）",
        "probability": 6.56e-06
    },
] as const;
const weapons: WeaponData[] = _weapons.map((weapon) => ({
    ...weapon,
    category: '武器',
    isIdentifiable: false,
}));

// ---- 防具 ----
type ArmorData = ItemData & typeof _armors[number] & {
    category: '防具';
    isIdentifiable: false;
}
const _armors = [
    {
        "name": "動物の皮",
        "probability": 0.01394236
    },
    {
        "name": "革の鎧",
        "probability": 0.020913659999999997
    },
    {
        "name": "青銅の鎧",
        "probability": 0.020913659999999997
    },
    {
        "name": "鉄の鎧",
        "probability": 0.01394194
    },
    {
        "name": "白銀の鎧",
        "probability": 0.008365089999999999
    },
    {
        "name": "白虎甲",
        "probability": 0.0041826400000000005
    },
    {
        "name": "漆黒の鎧",
        "probability": 0.00278831
    },
    {
        "name": "鳳凰闘衣",
        "probability": 0.00069714
    },
    {
        "name": "* の鎧",
        "probability": 6.97e-06
    },
    {
        "name": "超重量の鎧",
        "probability": 0.00418246
    },
    {
        "name": "悪魔の鎧",
        "probability": 0.0041826400000000005
    },
    {
        "name": "背水の鎧",
        "probability": 0.00418258
    },
    {
        "name": "風の羽衣",
        "probability": 0.005576729999999999
    },
    {
        "name": "幻影の鎧",
        "probability": 0.0027883599999999997
    },
    {
        "name": "鏡の鎧",
        "probability": 0.0027883599999999997
    },
    {
        "name": "弁慶の鎧",
        "probability": 0.00278842
    },
    {
        "name": "魔法の鎧",
        "probability": 0.00278848
    },
    {
        "name": "奇跡の鎧",
        "probability": 0.00278825
    },
    {
        "name": "ふんどし",
        "probability": 0.00139421
    },
    {
        "name": "反動装甲",
        "probability": 6.962e-05
    },
    {
        "name": "まわし",
        "probability": 1.401e-05
    },
    {
        "name": "伝説の鎧（偽物）",
        "probability": 0.0006970800000000001
    },
    {
        "name": "伝説の鎧（本物）",
        "probability": 7.03e-06
    },
    {
        "name": "魂の鎧",
        "probability": 0.0
    },
] as const;
const armors: ArmorData[] = _armors.map((armor) => ({
    ...armor,
    category: '防具',
    isIdentifiable: false,
}));

// ---- 腕輪 ----
type BraceletData = ItemData & typeof _bracelets[number] & {
    category: '腕輪';
    isIdentifiable: true;
};
const _bracelets = [
    {
        "name": "罠抜けの腕輪",
        "probability": 0.00308645
    },
    {
        "name": "罠呼びの腕輪",
        "probability": 0.00308585
    },
    {
        "name": "進化の腕輪",
        "probability": 0.00308621
    },
    {
        "name": "退化の腕輪",
        "probability": 0.00308603
    },
    {
        "name": "成長の腕輪",
        "probability": 0.00154293
    },
    {
        "name": "ダイエットの腕輪",
        "probability": 0.0030861499999999997
    },
    {
        "name": "回復の腕輪",
        "probability": 0.00308597
    },
    {
        "name": "太陽の腕輪",
        "probability": 0.00308609
    },
    {
        "name": "暗闇の腕輪",
        "probability": 0.00308603
    },
    {
        "name": "垂直の腕輪",
        "probability": 0.00308609
    },
    {
        "name": "モンスターの腕輪",
        "probability": 0.00205737
    },
    {
        "name": "復活の腕輪",
        "probability": 0.0010287200000000001
    },
    {
        "name": "金庫の腕輪",
        "probability": 0.00205725
    },
    {
        "name": "混乱よけの腕輪",
        "probability": 0.00308609
    },
    {
        "name": "錆びよけの腕輪",
        "probability": 0.00308609
    },
    {
        "name": "眠りよけの腕輪",
        "probability": 0.00308597
    },
    {
        "name": "忘れずの腕輪",
        "probability": 0.00308633
    },
    {
        "name": "次元爆弾の腕輪",
        "probability": 0.00102884
    },
    {
        "name": "騎士の腕輪",
        "probability": 5.144e-05
    },
    {
        "name": "王の腕輪",
        "probability": 5.144e-05
    },
    {
        "name": "合成の腕輪",
        "probability": 5.07e-06
    },
    {
        "name": "心眼の腕輪",
        "probability": 0.00205761
    },
] as const;
const bracelets: BraceletData[] = _bracelets.map((bracelet) => ({
    ...bracelet,
    category: '腕輪',
    isIdentifiable: true,
}));

// ---- 飛び道具 ----
type FirearmData = ItemData & typeof _firearms[number] & {
    category: '飛び道具';
    isIdentifiable: false;
};
const _firearms = [
    {
        "name": "弓矢",
        "probability": 0.02142805
    },
    {
        "name": "鉄砲",
        "probability": 0.01428562
    },
    {
        "name": "バズーカ砲",
        "probability": 0.00714332
    },
    {
        "name": "レーザー銃",
        "probability": 0.00714302
    },
    {
        "name": "サテライト砲",
        "probability": 0.0
    },
] as const;
const firearms: FirearmData[] = _firearms.map((firearm) => ({
    ...firearm,
    category: '飛び道具',
    isIdentifiable: false,
}));

// ---- 食料 ----
type FoodData = ItemData & typeof _foods[number] & {
    category: '食料';
    isIdentifiable: false;
};
const _foods = [
    {
        "name": "ラーメン",
        "probability": 0.06111091
    },
    {
        "name": "極上ラーメン",
        "probability": 0.00611138
    },
    {
        "name": "大盛りラーメン",
        "probability": 0.0244447
    },
    {
        "name": "謎のラーメン",
        "probability": 0.0
    },
    {
        "name": "チャーシュー麺",
        "probability": 0.00611103
    },
    {
        "name": "火薬ラーメン",
        "probability": 0.01222199
    },
    {
        "name": "お湯",
        "probability": 0.06
    },
] as const;
const foods: FoodData[] = _foods.map((food) => ({
    ...food,
    category: '食料',
    isIdentifiable: false,
}));

// ---- 草 ----
type GrassData = ItemData & typeof _grasses[number] & {
    category: '草';
    isIdentifiable: true;
};
const _grasses = [
    {
        "name": "薬草",
        "probability": 0.026020880000000003
    },
    {
        "name": "毒草",
        "probability": 0.026020289999999998
    },
    {
        "name": "ただの草",
        "probability": 0.01734668
    },
    {
        "name": "ワープ草",
        "probability": 0.026019929999999997
    },
    {
        "name": "アルコール草",
        "probability": 0.026019929999999997
    },
    {
        "name": "毒消し草",
        "probability": 0.026020819999999997
    },
    {
        "name": "命の草",
        "probability": 0.013010500000000001
    },
    {
        "name": "魂の草",
        "probability": 0.00086725
    },
    {
        "name": "忘れな草",
        "probability": 0.00867367
    },
] as const;
const grasses: GrassData[] = _grasses.map((grass) => ({
    ...grass,
    category: '草',
    isIdentifiable: true,
}));

// ---- 薬 ----
type MedicineData = ItemData & typeof _medicines[number] & {
    category: '薬';
    isIdentifiable: true;
};
const _medicines = [
    {
        "name": "傷薬",
        "probability": 0.00555539
    },
    {
        "name": "力の薬",
        "probability": 0.00370359
    },
    {
        "name": "守りの薬",
        "probability": 0.0037037100000000002
    },
    {
        "name": "透明薬",
        "probability": 0.00555539
    },
    {
        "name": "睡眠薬",
        "probability": 0.0055555100000000005
    },
    {
        "name": "麻薬",
        "probability": 0.0055555100000000005
    },
    {
        "name": "初心の薬",
        "probability": 0.0018521499999999999
    },
    {
        "name": "レベル変化薬",
        "probability": 0.00185192
    },
    {
        "name": "やる気の素",
        "probability": 0.0037040099999999998
    },
    {
        "name": "青い汁",
        "probability": 0.00370353
    },
    {
        "name": "墨汁",
        "probability": 0.0037037100000000002
    },
    {
        "name": "目薬",
        "probability": 0.005555569999999999
    },
] as const;
const medicines: MedicineData[] = _medicines.map((medicine) => ({
    ...medicine,
    category: '薬',
    isIdentifiable: true,
}));

// ---- 巻物 ----
type ScrollData = ItemData & typeof _scrolls[number] & {
    category: '巻物';
    isIdentifiable: true;
    isSelectable: boolean;
};
const _scrolls = [
    {
        "name": "識別の巻物",
        "probability": 0.04400045,
        "isSelectable": true
    },
    {
        "name": "明かりの巻物",
        "probability": 0.01257157,
        "isSelectable": false
    },
    {
        "name": "敵察知の巻物",
        "probability": 0.01257157,
        "isSelectable": false
    },
    {
        "name": "アイテム発見の巻物",
        "probability": 0.01257157,
        "isSelectable": false
    },
    {
        "name": "子守り歌の巻物",
        "probability": 0.0094285,
        "isSelectable": false
    },
    {
        "name": "爆発の巻物",
        "probability": 0.009428800000000001,
        "isSelectable": false
    },
    {
        "name": "大爆発の巻物",
        "probability": 0.00942856,
        "isSelectable": false
    },
    {
        "name": "壁破壊の巻物",
        "probability": 0.00942856,
        "isSelectable": false
    },
    {
        "name": "杖の巻物",
        "probability": 0.00942874,
        "isSelectable": true
    },
    {
        "name": "御払いの巻物",
        "probability": 0.00942826,
        "isSelectable": false
    },
    {
        "name": "呪いの巻物",
        "probability": 0.00314301,
        "isSelectable": false
    },
    {
        "name": "核兵器の巻物",
        "probability": 0.0062856100000000005,
        "isSelectable": false
    },
    {
        "name": "白紙の巻物",
        "probability": 0.00031406,
        "isSelectable": false
    },
    {
        "name": "くちなしの巻物",
        "probability": 0.00314307,
        "isSelectable": false
    },
    {
        "name": "武器屋の巻物",
        "probability": 0.010056849999999999,
        "isSelectable": false
    },
    {
        "name": "防具屋の巻物",
        "probability": 0.010056849999999999,
        "isSelectable": false
    },
    {
        "name": "困った時の巻物",
        "probability": 0.00314307,
        "isSelectable": false
    },
    {
        "name": "分裂の巻物",
        "probability": 0.00031406,
        "isSelectable": true
    },
    {
        "name": "消滅の巻物",
        "probability": 0.00628555,
        "isSelectable": true
    },
    {
        "name": "階段の巻物",
        "probability": 0.00314307,
        "isSelectable": false
    },
    {
        "name": "爆弾の巻物",
        "probability": 0.0094282,
        "isSelectable": false
    },
    {
        "name": "武器合成の巻物",
        "probability": 0.00408584,
        "isSelectable": true
    },
    {
        "name": "防具合成の巻物",
        "probability": 0.0040856,
        "isSelectable": true
    },
    {
        "name": "腕輪強化の巻物",
        "probability": 0.00408566,
        "isSelectable": false
    },
    {
        "name": "メッキの巻物",
        "probability": 0.009428800000000001,
        "isSelectable": false
    },
    {
        "name": "お掃除の巻物",
        "probability": 0.0031427100000000004,
        "isSelectable": false
    },
    {
        "name": "腕輪屋の巻物",
        "probability": 0.0,
        "isSelectable": false
    },
    {
        "name": "変な巻物",
        "probability": 0.0,
        "isSelectable": false
    },
    {
        "name": "時の巻物",
        "probability": 0.00157142,
        "isSelectable": false
    },
] as const;
const scrolls: ScrollData[] = _scrolls.map((scroll) => ({
    ...scroll,
    category: '巻物',
    isIdentifiable: true,
}));

// ---- 杖 ----
type StaffData = ItemData & typeof _staffs[number] & {
    category: '杖';
    isIdentifiable: true;
};
const _staffs = [
    {
        "name": "吹き飛ばしの杖",
        "probability": 0.0040403
    },
    {
        "name": "ワープの杖",
        "probability": 0.00404042
    },
    {
        "name": "引き寄せの杖",
        "probability": 0.0040403
    },
    {
        "name": "恨みの杖",
        "probability": 0.00404042
    },
    {
        "name": "混乱の杖",
        "probability": 0.0040403
    },
    {
        "name": "入れ替わりの杖",
        "probability": 0.0040403
    },
    {
        "name": "呪縛の杖",
        "probability": 0.00404042
    },
    {
        "name": "吸い取りの杖",
        "probability": 0.0040403
    },
    {
        "name": "変身の杖",
        "probability": 0.0040403
    },
    {
        "name": "無防備の杖",
        "probability": 0.0040406
    },
    {
        "name": "秘孔の杖",
        "probability": 0.00404066
    },
    {
        "name": "封印の杖",
        "probability": 0.00404048
    },
    {
        "name": "分裂の杖",
        "probability": 0.00101012
    },
    {
        "name": "死神の杖",
        "probability": 0.00050503
    }
] as const;
export const staffs: StaffData[] = _staffs.map((staff) => ({
    ...staff,
    category: '杖',
    isIdentifiable: true,
}));

// ---- 魔石 ----
type StoneData = ItemData & typeof _stones[number] & {
    category: '魔石';
    isIdentifiable: false;
};
const _stones = [
    {
        "name": "光の魔石",
        "probability": 0.0
    },
] as const;
const stones: StoneData[] = _stones.map((stone) => ({
    ...stone,
    category: '魔石',
    isIdentifiable: false,
}));

export type Item = typeof items[number];
export const items = [...weapons, ...armors, ...bracelets, ...firearms, ...foods, ...grasses, ...scrolls, ...staffs, ...stones] as const satisfies readonly ItemData[];
