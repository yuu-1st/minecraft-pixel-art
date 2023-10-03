/* some data is used by https://minecraft.fandom.com/wiki/Map_item_format */

export const minecraftColorData = [
  {
    id: 1,
    key: 'GRASS',
    color: { r: 127, g: 178, b: 56 },
    block: ['glass_block', 'slime_block']
  },
  {
    id: 2,
    key: 'SAND',
    color: { r: 247, g: 233, b: 163 },
    block: [
      'sand',
      'ochre_froglight',
      'birch_planks',
      'sandstone',
      'glowstone',
      'end_stone_bricks',
      'bone_block'
    ]
  },
  {
    id: 3,
    key: 'WOOL',
    color: { r: 199, g: 199, b: 199 },
    block: ['mushroom_stem', 'cobweb']
  },
  {
    id: 4,
    key: 'FIRE',
    color: { r: 255, g: 0, b: 0 },
    block: ['redstone_block', 'tnt']
  },
  {
    id: 5,
    key: 'ICE',
    color: { r: 160, g: 160, b: 255 },
    block: ['frosted_ice', 'packed_ice', 'blue_ice', 'ice']
  },
  {
    id: 6,
    key: 'METAL',
    color: { r: 167, g: 167, b: 167 },
    block: ['iron_block', 'lodestone']
  },
  {
    id: 7,
    key: 'PLANT',
    color: { r: 0, g: 124, b: 0 },
    block: [
      'oak_leaves',
      'birch_leaves',
      'jungle_leaves',
      'acacia_leaves',
      'dark_oak_leaves',
      'spruce_leaves',
      'azalea_leaves',
      'flowering_azalea_leaves',
      'mangrove_leaves'
    ]
  },
  {
    id: 8,
    key: 'SNOW',
    color: { r: 255, g: 255, b: 255 },
    block: ['snow_block', 'white_item']
  },
  { id: 9, key: 'CLAY', color: { r: 164, g: 168, b: 184 }, block: ['clay'] },
  {
    id: 10,
    key: 'DIRT',
    color: { r: 151, g: 109, b: 77 },
    block: ['dirt', 'packed_mud', 'coarse_dirt', 'granite', 'jungle_planks']
  },
  {
    id: 11,
    key: 'STONE',
    color: { r: 112, g: 112, b: 112 },
    block: ['stone', 'polished_andesite']
  },
  { id: 12, key: 'WATER', color: { r: 64, g: 64, b: 255 }, block: ['water'] },
  {
    id: 13,
    key: 'WOOD',
    color: { r: 143, g: 119, b: 72 },
    block: ['chiseled_bookshelf', 'oak_planks', 'bookshelf']
  },
  {
    id: 14,
    key: 'QUARTZ',
    color: { r: 255, g: 252, b: 245 },
    block: ['quartz_block', 'quartz_pillar', 'sea_lantern', 'diorite']
  },
  {
    id: 15,
    key: 'COLOR_ORANGE',
    color: { r: 216, g: 127, b: 51 },
    block: ['acacia_planks', 'orange_item']
  },
  {
    id: 16,
    key: 'COLOR_MAGENTA',
    color: { r: 178, g: 76, b: 216 },
    block: ['magenta_item', 'purpur_block']
  },
  {
    id: 17,
    key: 'COLOR_LIGHT_BLUE',
    color: { r: 102, g: 153, b: 216 },
    block: ['light_blue_item']
  },
  {
    id: 18,
    key: 'COLOR_YELLOW',
    color: { r: 229, g: 229, b: 51 },
    block: [
      'yellow_item',
      'stripped_bamboo_block',
      'bamboo_planks',
      'bamboo_block'
    ]
  },
  {
    id: 19,
    key: 'COLOR_LIGHT_GREEN',
    color: { r: 127, g: 204, b: 25 },
    block: ['lime_item']
  },
  {
    id: 20,
    key: 'COLOR_PINK',
    color: { r: 242, g: 127, b: 165 },
    block: ['pink_item', 'pearlescent_froglight', 'cherry_leaves']
  },
  {
    id: 21,
    key: 'COLOR_GRAY',
    color: { r: 76, g: 76, b: 76 },
    block: ['gray_item', 'dead_coral_block']
  },
  {
    id: 22,
    key: 'COLOR_LIGHT_GRAY',
    color: { r: 153, g: 153, b: 153 },
    block: ['light_gray_item']
  },
  {
    id: 23,
    key: 'COLOR_CYAN',
    color: { r: 76, g: 127, b: 153 },
    block: ['cyan_item', 'sculk_sensor', 'calibrated_sculk_sensor']
  },
  {
    id: 24,
    key: 'COLOR_PURPLE',
    color: { r: 127, g: 63, b: 178 },
    block: ['purple_item', 'amethyst_block']
  },
  {
    id: 25,
    key: 'COLOR_BLUE',
    color: { r: 51, g: 76, b: 178 },
    block: ['blue_item']
  },
  {
    id: 26,
    key: 'COLOR_BROWN',
    color: { r: 102, g: 76, b: 51 },
    block: ['brown_item', 'dark_oak_planks', 'soul_sand']
  },
  {
    id: 27,
    key: 'COLOR_GREEN',
    color: { r: 102, g: 127, b: 51 },
    block: ['green_item', 'moss_block']
  },
  {
    id: 28,
    key: 'COLOR_RED',
    color: { r: 153, g: 51, b: 51 },
    block: ['red_item', 'mangrove_log', 'mangrove_planks', 'nether_wart_block']
  },
  {
    id: 29,
    key: 'COLOR_BLACK',
    color: { r: 25, g: 25, b: 25 },
    block: [
      'black_item',
      'obsidian',
      'sculk',
      'sculk_vein',
      'sculk_catalyst',
      'sculk_shrieker'
    ]
  },
  {
    id: 30,
    key: 'GOLD',
    color: { r: 250, g: 238, b: 77 },
    block: ['gold_block']
  },
  {
    id: 31,
    key: 'DIAMOND',
    color: { r: 92, g: 219, b: 213 },
    block: ['diamond_block', 'prismarine_bricks']
  },
  {
    id: 32,
    key: 'LAPIS',
    color: { r: 74, g: 128, b: 255 },
    block: ['lapis_block']
  },
  {
    id: 33,
    key: 'EMERALD',
    color: { r: 0, g: 217, b: 58 },
    block: ['emerald_block']
  },
  {
    id: 34,
    key: 'PODZOL',
    color: { r: 129, g: 86, b: 49 },
    block: ['spruce_planks', 'mangrove_roots', 'muddy_mangrove_roots', 'podzol']
  },
  {
    id: 35,
    key: 'NETHER',
    color: { r: 112, g: 2, b: 0 },
    block: ['netherrack']
  },
  {
    id: 36,
    key: 'TERRACOTTA_WHITE',
    color: { r: 209, g: 177, b: 161 },
    block: ['cherry_planks', 'cherry_log', 'white_terracotta', 'calcite']
  },
  {
    id: 37,
    key: 'TERRACOTTA_ORANGE',
    color: { r: 159, g: 82, b: 36 },
    block: ['orange_terracotta']
  },
  {
    id: 38,
    key: 'TERRACOTTA_MAGENTA',
    color: { r: 149, g: 87, b: 108 },
    block: ['magenta_terracotta']
  },
  {
    id: 39,
    key: 'TERRACOTTA_LIGHT_BLUE',
    color: { r: 112, g: 108, b: 138 },
    block: ['light_blue_terracotta']
  },
  {
    id: 40,
    key: 'TERRACOTTA_YELLOW',
    color: { r: 186, g: 133, b: 36 },
    block: ['yellow_terracotta']
  },
  {
    id: 41,
    key: 'TERRACOTTA_LIGHT_GREEN',
    color: { r: 103, g: 117, b: 53 },
    block: ['lime_terracotta']
  },
  {
    id: 42,
    key: 'TERRACOTTA_PINK',
    color: { r: 160, g: 77, b: 78 },
    block: ['pink_terracotta']
  },
  {
    id: 43,
    key: 'TERRACOTTA_GRAY',
    color: { r: 57, g: 41, b: 35 },
    block: ['gray_terracotta', 'cherry_wood']
  },
  {
    id: 44,
    key: 'TERRACOTTA_LIGHT_GRAY',
    color: { r: 135, g: 107, b: 98 },
    block: ['light_gray_terracotta', 'mud_bricks']
  },
  {
    id: 45,
    key: 'TERRACOTTA_CYAN',
    color: { r: 87, g: 92, b: 92 },
    block: ['mud', 'cyan_terracotta']
  },
  {
    id: 46,
    key: 'TERRACOTTA_PURPLE',
    color: { r: 122, g: 73, b: 88 },
    block: ['purple_terracotta']
  },
  {
    id: 47,
    key: 'TERRACOTTA_BLUE',
    color: { r: 76, g: 62, b: 92 },
    block: ['blue_terracotta']
  },
  {
    id: 48,
    key: 'TERRACOTTA_BROWN',
    color: { r: 76, g: 50, b: 35 },
    block: ['brown_terracotta', 'dripstone_block']
  },
  {
    id: 49,
    key: 'TERRACOTTA_GREEN',
    color: { r: 76, g: 82, b: 42 },
    block: ['green_terracotta']
  },
  {
    id: 50,
    key: 'TERRACOTTA_RED',
    color: { r: 142, g: 60, b: 46 },
    block: ['decorated_pot', 'red_terracotta']
  },
  {
    id: 51,
    key: 'TERRACOTTA_BLACK',
    color: { r: 37, g: 22, b: 16 },
    block: ['black_terracotta']
  },
  {
    id: 52,
    key: 'CRIMSON_NYLIUM',
    color: { r: 189, g: 48, b: 49 },
    block: ['crimson_nylium']
  },
  {
    id: 53,
    key: 'CRIMSON_STEM',
    color: { r: 148, g: 63, b: 97 },
    block: ['crimson_planks']
  },
  {
    id: 54,
    key: 'CRIMSON_HYPHAE',
    color: { r: 92, g: 25, b: 29 },
    block: ['crimson_hyphae']
  },
  {
    id: 55,
    key: 'WARPED_NYLIUM',
    color: { r: 22, g: 126, b: 134 },
    block: ['warped_nylium', 'oxidized_copper']
  },
  {
    id: 56,
    key: 'WARPED_STEM',
    color: { r: 58, g: 142, b: 140 },
    block: ['warped_planks']
  },
  {
    id: 57,
    key: 'WARPED_HYPHAE',
    color: { r: 86, g: 44, b: 62 },
    block: ['warped_hyphae']
  },
  {
    id: 58,
    key: 'WARPED_WART_BLOCK',
    color: { r: 20, g: 180, b: 133 },
    block: ['warped_wart_block']
  },
  {
    id: 59,
    key: 'DEEPSLATE',
    color: { r: 100, g: 100, b: 100 },
    block: ['deepslate']
  },
  {
    id: 60,
    key: 'RAW_IRON',
    color: { r: 216, g: 175, b: 147 },
    block: ['raw_iron_block']
  },
  {
    id: 61,
    key: 'GLOW_LICHEN',
    color: { r: 127, g: 167, b: 150 },
    block: ['verdant_froglight', 'glow_lichen']
  }
] as const satisfies ReadonlyArray<{
  id: number
  key: string
  color: {
    r: number
    g: number
    b: number
  }
  block: ReadonlyArray<keyof typeof minecraftBlockData>
}>

export const minecraftBlockData = {
  none: { name: { ja: 'なし', en: 'None' }, tag: [] },
  glass_block: { name: { ja: '草ブロック', en: 'Glass Block' }, tag: [] },
  slime_block: { name: { ja: 'スライムブロック', en: 'Slime Block' }, tag: [] },
  ochre_froglight: {
    name: { ja: '黄土色のフロッグライト', en: 'Ochre Froglight' },
    tag: []
  },
  sand: { name: { ja: '砂', en: 'Sand' }, tag: [] },
  birch_planks: { name: { ja: 'シラカバの木材', en: 'Birch Planks' }, tag: [] },
  sandstone: { name: { ja: '砂岩', en: 'Sandstone' }, tag: [] },
  glowstone: { name: { ja: 'グロウストーン', en: 'Glowstone' }, tag: [] },
  end_stone_bricks: {
    name: { ja: 'エンドストーンレンガ', en: 'End Stone Bricks' },
    tag: []
  },
  bone_block: { name: { ja: '骨ブロック', en: 'Bone Block' }, tag: [] },
  cobweb: { name: { ja: 'クモの巣', en: 'Cobweb' }, tag: [] },
  mushroom_stem: { name: { ja: 'キノコの柄', en: 'Mushroom Stem' }, tag: [] },
  tnt: { name: { ja: 'TNT', en: 'TNT' }, tag: [] },
  redstone_block: {
    name: { ja: 'レッドストーンブロック', en: 'Redstone Block' },
    tag: []
  },
  ice: { name: { ja: '氷', en: 'Ice' }, tag: [] },
  frosted_ice: { name: { ja: '薄氷', en: 'Frosted Ice' }, tag: [] },
  packed_ice: { name: { ja: '氷塊', en: 'Packed Ice' }, tag: [] },
  blue_ice: { name: { ja: '青氷', en: 'Blue Ice' }, tag: [] },
  iron_block: { name: { ja: '鉄ブロック', en: 'Iron Block' }, tag: [] },
  lodestone: { name: { ja: 'ロードストーン', en: 'Lodestone' }, tag: [] },
  mangrove_leaves: {
    name: { ja: 'マングローブの葉', en: 'Mangrove Leaves' },
    tag: []
  },
  oak_leaves: { name: { ja: 'オークの葉', en: 'Oak Leaves' }, tag: [] },
  birch_leaves: { name: { ja: 'シラカバの葉', en: 'Birch Leaves' }, tag: [] },
  jungle_leaves: {
    name: { ja: 'ジャングルの葉', en: 'Jungle Leaves' },
    tag: []
  },
  acacia_leaves: { name: { ja: 'アカシアの葉', en: 'Acacia Leaves' }, tag: [] },
  dark_oak_leaves: {
    name: { ja: 'ダークオークの葉', en: 'Dark Oak Leaves' },
    tag: []
  },
  spruce_leaves: { name: { ja: 'トウヒの葉', en: 'Spruce Leaves' }, tag: [] },
  azalea_leaves: { name: { ja: 'ツツジの葉', en: 'Azalea Leaves' }, tag: [] },
  flowering_azalea_leaves: {
    name: { ja: '開花したツツジの葉', en: 'Flowering Azalea Leaves' },
    tag: []
  },
  snow_block: { name: { ja: '雪ブロック', en: 'Snow Block' }, tag: [] },
  white_item: {
    name: { ja: '白色の染料を使ったブロック', en: 'Block using white dye' },
    tag: ['color']
  },
  clay: { name: { ja: '粘土', en: 'Clay' }, tag: [] },
  packed_mud: { name: { ja: '固めた泥', en: 'Packed Mud' }, tag: [] },
  dirt: { name: { ja: '土', en: 'Dirt' }, tag: [] },
  coarse_dirt: { name: { ja: '粗い土', en: 'Coarse Dirt' }, tag: [] },
  granite: { name: { ja: '花崗岩', en: 'Granite' }, tag: [] },
  jungle_planks: {
    name: { ja: 'ジャングルの木材', en: 'Jungle Planks' },
    tag: []
  },
  stone: { name: { ja: '石', en: 'Stone' }, tag: [] },
  polished_andesite: {
    name: { ja: '磨かれた安山岩', en: 'Polished Andesite' },
    tag: []
  },
  water: { name: { ja: '水', en: 'Water' }, tag: [] },
  chiseled_bookshelf: {
    name: { ja: '模様入りの本棚', en: 'Chiseled Bookshelf' },
    tag: []
  },
  oak_planks: { name: { ja: 'オークの木材', en: 'Oak Planks' }, tag: [] },
  bookshelf: { name: { ja: '本棚', en: 'Bookshelf' }, tag: [] },
  diorite: { name: { ja: '閃緑岩', en: 'Diorite' }, tag: [] },
  quartz_block: {
    name: { ja: 'クォーツブロック', en: 'Quartz Block' },
    tag: []
  },
  quartz_pillar: { name: { ja: 'クォーツの柱', en: 'Quartz Pillar' }, tag: [] },
  sea_lantern: { name: { ja: 'シーランタン', en: 'Sea Lantern' }, tag: [] },
  acacia_planks: {
    name: { ja: 'アカシアの木材', en: 'Acacia Planks' },
    tag: []
  },
  orange_item: {
    name: { ja: '橙色の染料を使ったブロック', en: 'Block using orange dye' },
    tag: ['color']
  },
  magenta_item: {
    name: { ja: '赤紫色の染料を使ったブロック', en: 'Block using magenta dye' },
    tag: ['color']
  },
  purpur_block: {
    name: { ja: 'プルプァブロック', en: 'Purpur Block' },
    tag: []
  },
  light_blue_item: {
    name: {
      ja: '空色の染料を使ったブロック',
      en: 'Block using light blue dye'
    },
    tag: ['color']
  },
  stripped_bamboo_block: {
    name: { ja: '表皮を剥いだ竹ブロック', en: 'Stripped Bamboo Block' },
    tag: []
  },
  bamboo_planks: { name: { ja: '竹の木材', en: 'Bamboo Planks' }, tag: [] },
  bamboo_block: { name: { ja: '竹ブロック', en: 'Bamboo Block' }, tag: [] },
  yellow_item: {
    name: { ja: '黄色の染料を使ったブロック', en: 'Block using yellow dye' },
    tag: ['color']
  },
  lime_item: {
    name: { ja: '黄緑色の染料を使ったブロック', en: 'Block using lime dye' },
    tag: ['color']
  },
  pearlescent_froglight: {
    name: { ja: ' 真珠色のフロッグライト', en: 'Pearlescent Froglight' },
    tag: []
  },
  cherry_leaves: { name: { ja: 'サクラの葉', en: 'Cherry Leaves' }, tag: [] },
  pink_item: {
    name: { ja: '桃色の染料を使ったブロック', en: 'Block using pink dye' },
    tag: ['color']
  },
  gray_item: {
    name: { ja: '灰色の染料を使ったブロック', en: 'Block using gray dye' },
    tag: ['color']
  },
  dead_coral_block: {
    name: { ja: '枯れたサンゴブロック', en: 'Dead Coral Block' },
    tag: []
  },
  light_gray_item: {
    name: {
      ja: '薄灰色の染料を使ったブロック',
      en: 'Block using light gray dye'
    },
    tag: ['color']
  },
  sculk_sensor: {
    name: { ja: 'スカルクセンサー', en: 'Sculk Sensor' },
    tag: []
  },
  calibrated_sculk_sensor: {
    name: { ja: '調律されたスカルクセンサー', en: 'Calibrated Sculk Sensor' },
    tag: []
  },
  cyan_item: {
    name: { ja: '青緑色の染料を使ったブロック', en: 'Block using cyan dye' },
    tag: ['color']
  },
  purple_item: {
    name: { ja: '紫色の染料を使ったブロック', en: 'Block using purple dye' },
    tag: ['color']
  },
  amethyst_block: {
    name: { ja: 'アメジストブロック', en: 'Amethyst Block' },
    tag: []
  },
  blue_item: {
    name: { ja: '青色の染料を使ったブロック', en: 'Block using blue dye' },
    tag: ['color']
  },
  brown_item: {
    name: { ja: '茶色の染料を使ったブロック', en: 'Block using brown dye' },
    tag: ['color']
  },
  dark_oak_planks: {
    name: { ja: 'ダークオークの木材', en: 'Dark Oak Planks' },
    tag: []
  },
  soul_sand: { name: { ja: 'ソウルサンド', en: 'Soul Sand' }, tag: [] },
  green_item: {
    name: { ja: '緑色の染料を使ったブロック', en: 'Block using green dye' },
    tag: ['color']
  },
  moss_block: { name: { ja: '苔ブロック', en: 'Moss Block' }, tag: [] },
  mangrove_log: {
    name: { ja: 'マングローブの原木', en: 'Mangrove Log' },
    tag: []
  },
  mangrove_planks: {
    name: { ja: 'マングローブの木材', en: 'Mangrove Planks' },
    tag: []
  },
  red_item: {
    name: { ja: '赤色の染料を使ったブロック', en: 'Block using red dye' },
    tag: ['color']
  },
  nether_wart_block: {
    name: { ja: 'ネザーウォートブロック', en: 'Nether Wart Block' },
    tag: []
  },
  sculk: { name: { ja: 'スカルク', en: 'Sculk' }, tag: [] },
  sculk_vein: { name: { ja: 'スカルクヴェイン', en: 'Sculk Vein' }, tag: [] },
  sculk_catalyst: {
    name: { ja: 'スカルクカタリスト', en: 'Sculk Catalyst' },
    tag: []
  },
  sculk_shrieker: {
    name: { ja: 'スカルクシュリーカー', en: 'Sculk Shrieker' },
    tag: []
  },
  black_item: {
    name: { ja: '黒色の染料を使ったブロック', en: 'Block using black dye' },
    tag: ['color']
  },
  obsidian: { name: { ja: '黒曜石', en: 'Obsidian' }, tag: [] },
  gold_block: { name: { ja: '金ブロック', en: 'Gold Block' }, tag: [] },
  diamond_block: {
    name: { ja: 'ダイヤモンドブロック', en: 'Diamond Block' },
    tag: []
  },
  prismarine_bricks: {
    name: { ja: 'プリズマリンレンガ', en: 'Prismarine Bricks' },
    tag: []
  },
  lapis_block: {
    name: { ja: 'ラピスラズリブロック', en: 'Lapis Block' },
    tag: []
  },
  emerald_block: {
    name: { ja: 'エメラルドブロック', en: 'Emerald Block' },
    tag: []
  },
  mangrove_roots: {
    name: { ja: 'マングローブの根', en: 'Mangrove Roots' },
    tag: []
  },
  muddy_mangrove_roots: {
    name: { ja: '泥だらけのマングローブの根', en: 'Muddy Mangrove Roots' },
    tag: []
  },
  podzol: { name: { ja: 'ポドゾル', en: 'Podzol' }, tag: [] },
  spruce_planks: { name: { ja: 'トウヒの木材', en: 'Spruce Planks' }, tag: [] },
  netherrack: { name: { ja: 'ネザーラック', en: 'Netherrack' }, tag: [] },
  cherry_log: { name: { ja: 'サクラの原木', en: 'Cherry Log' }, tag: [] },
  cherry_planks: { name: { ja: 'サクラの木材', en: 'Cherry Planks' }, tag: [] },
  white_terracotta: {
    name: { ja: '白色のテラコッタ', en: 'White Terracotta' },
    tag: []
  },
  calcite: { name: { ja: '方解石', en: 'Calcite' }, tag: [] },
  orange_terracotta: {
    name: { ja: '橙色のテラコッタ', en: 'Orange Terracotta' },
    tag: []
  },
  magenta_terracotta: {
    name: { ja: '赤紫色のテラコッタ', en: 'Magenta Terracotta' },
    tag: []
  },
  light_blue_terracotta: {
    name: { ja: '空色のテラコッタ', en: 'Light Blue Terracotta' },
    tag: []
  },
  yellow_terracotta: {
    name: { ja: '黄色のテラコッタ', en: 'Yellow Terracotta' },
    tag: []
  },
  lime_terracotta: {
    name: { ja: '黄緑色のテラコッタ', en: 'Lime Terracotta' },
    tag: []
  },
  pink_terracotta: {
    name: { ja: '桃色のテラコッタ', en: 'Pink Terracotta' },
    tag: []
  },
  cherry_wood: { name: { ja: 'サクラの木', en: 'Cherry Wood' }, tag: [] },
  gray_terracotta: {
    name: { ja: '灰色のテラコッタ', en: 'Gray Terracotta' },
    tag: []
  },
  mud_bricks: { name: { ja: '泥レンガ', en: 'Mud Bricks' }, tag: [] },
  light_gray_terracotta: {
    name: { ja: '薄灰色のテラコッタ', en: 'Light Gray Terracotta' },
    tag: []
  },
  mud: { name: { ja: '泥', en: 'Mud' }, tag: [] },
  cyan_terracotta: {
    name: { ja: '青緑色のテラコッタ', en: 'Cyan Terracotta' },
    tag: []
  },
  purple_terracotta: {
    name: { ja: '紫色のテラコッタ', en: 'Purple Terracotta' },
    tag: []
  },
  blue_terracotta: {
    name: { ja: '青色のテラコッタ', en: 'Blue Terracotta' },
    tag: []
  },
  brown_terracotta: {
    name: { ja: '茶色のテラコッタ', en: 'Brown Terracotta' },
    tag: []
  },
  dripstone_block: {
    name: { ja: '鍾乳石ブロック', en: 'Dripstone Block' },
    tag: []
  },
  green_terracotta: {
    name: { ja: '緑色のテラコッタ', en: 'Green Terracotta' },
    tag: []
  },
  decorated_pot: { name: { ja: '飾り壺', en: 'Decorated Pot' }, tag: [] },
  red_terracotta: {
    name: { ja: '赤色のテラコッタ', en: 'Red Terracotta' },
    tag: []
  },
  black_terracotta: {
    name: { ja: '黒色のテラコッタ', en: 'Black Terracotta' },
    tag: []
  },
  crimson_nylium: {
    name: { ja: ' 真紅のナイリウム', en: 'Crimson Nylium' },
    tag: []
  },
  crimson_planks: { name: { ja: '真紅の木材', en: 'Crimson Planks' }, tag: [] },
  crimson_hyphae: { name: { ja: '真紅の菌糸', en: 'Crimson Hyphae' }, tag: [] },
  warped_nylium: {
    name: { ja: '歪んだナイリウム', en: 'Warped Nylium' },
    tag: []
  },
  oxidized_copper: {
    name: { ja: '酸化した銅', en: 'Oxidized Copper' },
    tag: []
  },
  warped_planks: { name: { ja: '歪んだ木材', en: 'Warped Planks' }, tag: [] },
  warped_hyphae: { name: { ja: '歪んだ菌糸', en: 'Warped Hyphae' }, tag: [] },
  warped_wart_block: {
    name: { ja: '歪んだウォートブロック', en: 'Warped Wart Block' },
    tag: []
  },
  deepslate: { name: { ja: '深層岩', en: 'Deepslate' }, tag: [] },
  raw_iron_block: {
    name: { ja: '鉄の原石ブロック', en: 'Block of Raw Iron' },
    tag: []
  },
  verdant_froglight: {
    name: { ja: '新緑色のフロッグライト', en: 'Verdant Froglight' },
    tag: []
  },
  glow_lichen: { name: { ja: 'ヒカリゴケ', en: 'Glow Lichen' }, tag: [] }
} as const satisfies {
  [key: string]: {
    name: {
      ja: string
      en: string
    }
    tag: readonly string[]
  }
}

export const colorBlockData = [
  {
    id: 0,
    key: 'wool',
    name: { ja: '羊毛', en: 'Wool' }
  },
  {
    id: 1,
    key: 'glass',
    name: { ja: 'ガラス', en: 'Glass' }
  },
  {
    id: 2,
    key: 'glazed_terracotta',
    name: { ja: '彩釉テラコッタ', en: 'Glazed Terracotta' }
  },
  {
    id: 3,
    key: 'concrete',
    name: { ja: 'コンクリート', en: 'Concrete' }
  }
] as const
