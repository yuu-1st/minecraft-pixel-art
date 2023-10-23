import { LanguageType, getLanguage } from '../lib/i18n'

type HelpDataType = {
  className?: string
  position: 'title' | 'subTitle' | 'body' | 'list'
} & {
  [key in LanguageType]: string
}

const helpData: HelpDataType[] = [
  {
    ja: 'Minecraft マップ生成ツール',
    en: 'Minecraft map generation tool',
    position: 'title'
  },
  {
    ja: '概要',
    en: 'Overview',
    position: 'subTitle'
  },
  {
    ja: 'このツールは、Minecraft上でドット絵を作成するために、画像をブロックに変換、もしくはfillコマンドで作成できるようにしたものです。',
    en: 'This tool is a tool that converts images into blocks or creates them with fill commands in order to create pixel art in Minecraft.',
    position: 'body'
  },
  {
    ja: '使い方',
    en: 'How to use',
    position: 'title'
  },
  {
    ja: '画像から地図を生成する',
    en: 'Generate a map from an image',
    position: 'subTitle'
  },
  {
    ja: 'ヘッダー部の「Map」を選択し、「画像をアップロード」のところに生成したい画像をアップロードする。',
    en: 'Select "Map" in the header section and upload the image you want to generate in "Upload an image".',
    position: 'body'
  },
  {
    ja: '「高さ」のところで生成したい地図の高さを選択する(幅は画像の比率に合わせて自動で調整されます)。',
    en: 'Select the height of the map you want to generate in "Height" (the width will be automatically adjusted to match the aspect ratio of the image).',
    position: 'body'
  },
  {
    ja: '左上の座標(x,zが最小値になる箇所)を入力する。',
    en: 'Enter the coordinates of the upper left corner (the point where x and z are the minimum values).',
    position: 'body'
  },
  {
    ja: '使用するブロックを選択する。また、「染料を使ったブロック」をどのブロックにするかを選択する。',
    en: 'Select the block to use. Also, select which block to use for "Dyeable block".',
    position: 'body'
  },
  {
    ja: '生成する方を選択する。',
    en: 'Select the direction to generate.',
    position: 'body'
  },
  {
    ja: 'fillコマンドから地図を生成する',
    en: 'Generate a map from a fill command',
    position: 'subTitle'
  },
  {
    ja: 'ヘッダー部の「Command」を選択し、fillコマンドを入力する。',
    en: 'Select "Command" in the header section and enter the fill command.',
    position: 'body'
  },
  {
    ja: 'fillコマンドをフォームに入力し、「地図を生成する」を押す。',
    en: 'Enter the fill command in the form and press "Generate map".',
    position: 'body'
  },
  {
    ja: '注意: fillコマンドは、x,z軸を平面とするフィールドが生成されます。立体や、縦向きのfillコマンドには現在対応していません。',
    en: 'Note: The fill command generates a field with the x and z axes as the plane. It does not currently support three-dimensional or vertical fill commands.',
    position: 'body'
  },
  {
    ja: '地図を表示する',
    en: 'Display map',
    position: 'subTitle'
  },
  {
    ja: '「Command」もしくは「Image」から地図を生成すると、「Map」が表示される。',
    en: 'When you generate a map from "Command" or "Image", "Map" is displayed.',
    position: 'body'
  },
  {
    ja: '地図は、縦にx座標、横にz座標が表示される。',
    en: 'The map displays the x coordinate vertically and the z coordinate horizontally.',
    position: 'body'
  },
  {
    ja: '「足元の座標で表示する」をonにすると、マイナス座標の際にブロック座標と1ずれるところが変化する。',
    en: 'If you turn on "Display at the foot coordinates", the block coordinates will change by 1 when the coordinates are negative.',
    position: 'body'
  },
  {
    ja: '表示倍率は、地図の画面サイズが変更される。',
    en: 'The display magnification changes the screen size of the map.',
    position: 'body'
  },
  {
    ja: '地図の任意のチャンクをクリックすると、そのチャンクで使用するブロック一覧と、必要個数を表示することができる。',
    en: 'Click on any chunk of the map to display a list of blocks used in that chunk and the number of blocks required.',
    position: 'body'
  },
  {
    ja: 'また、ブロック一覧から名前をクリックすると、そのブロックの位置がハイライトされるようになる。',
    en: 'Also, when you click on the name in the block list, the position of that block will be highlighted.',
    position: 'body'
  },
  {
    ja: '使用アルゴリズム',
    en: 'Used algorithm',
    position: 'title'
  },
  {
    ja: '色をドット絵用に変換: CIEDE2000',
    en: 'Convert color to pixel art: CIEDE2000',
    position: 'list'
  }
]

function DivComponent ({
  index,
  language
}: {
  index: number
  language: LanguageType
}): JSX.Element {
  const data = helpData[index]
  const className = data.className ?? ''
  switch (data.position) {
    case 'title':
      return (
        <h2 className={className}>
          {data[language]}
        </h2>
      )
    case 'subTitle':
      return (
        <h3 className={className}>
          {data[language]}
        </h3>
      )
    case 'body':
      return (
        <p className={className}>
          {data[language]}
        </p>
      )
    case 'list':
      return (
        <ul className={className}>
          {data[language].split('\n').map((value, index) => {
            return <li key={index}>{value}</li>
          })}
        </ul>
      )
    default:
      throw new Error('unhandled position')
  }
}

export function HelpComponent (): JSX.Element {
  return (
    <div className='m-3'>
      {helpData.map((data, index) => {
        return (
          <DivComponent
            key={index}
            index={index}
            language={getLanguage()}
          />
        )
      })}
    </div>
  )
}
