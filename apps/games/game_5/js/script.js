const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: '.تستيقظ في مكان غريب وترى جرة من مادة اللزوجة الزرقاء بالقرب منك',
    options: [
      {
        text: 'خذ مادة لزجة',
        setState: { blueGoo: true },
        nextText: 2
      },
      {
        text: 'اترك مادة اللزج',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: '.أنت تغامر في البحث عن إجابات لمكان وجودك عندما تصادف تاجرًا',
    options: [
      {
        text: 'استبدل اللزج بالسيف',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, sword: true },
        nextText: 3
      },
      {
        text: 'استبدل المادة اللاصقة بالدرع',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, shield: true },
        nextText: 3
      },
      {
        text: 'تجاهل التاجر',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'بعد مغادرة التاجر تبدأ في الشعور بالتعب وتعثر على بلدة صغيرة بجوار قلعة ذات مظهر خطير',
    options: [
      {
        text: 'استكشف القلعة',
        nextText: 4
      },
      {
        text: 'ابحث عن غرفة للنوم في المدينة',
        nextText: 5
      },
      {
        text: 'ابحث عن بعض التبن في إسطبل للنوم فيه',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'أنت متعب جدًا لدرجة أنك تغفو أثناء استكشاف القلعة وتقتل على يد وحش رهيب أثناء نومك',
    options: [
      {
        text: 'اعادة البدء',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'بدون أي نقود لشراء غرفة ، تقوم باقتحام أقرب نزل وتنام. بعد بضع ساعات من النوم ، يجدك صاحب النزل وقام حارس المدينة بحبسك في زنزانة',
    options: [
      {
        text: 'اعادة البدء',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'تستيقظ مرتاحًا جيدًا ومليء بالطاقة على استعداد لاستكشاف القلعة القريبة',
    options: [
      {
        text: 'استكشف القلعة',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'أثناء استكشاف القلعة ، تصادف وحشًا رهيبًا في طريقك',
    options: [
      {
        text: 'حاول الجري',
        nextText: 8
      },
      {
        text: 'هاجمها بسيفك',
        requiredState: (currentState) => currentState.sword,
        nextText: 9
      },
      {
        text: 'اختبئ خلف درعك',
        requiredState: (currentState) => currentState.shield,
        nextText: 10
      },
      {
        text: 'رمي المادة اللزجة الزرقاء عليها',
        requiredState: (currentState) => currentState.blueGoo,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'محاولاتك للركض تذهب سدى ويسهل القبض على الوحش',
    options: [
      {
        text: 'اعادة البدء',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'كنت تعتقد بحماقة أن هذا الوحش يمكن أن يقتل بسيف واحد',
    options: [
      {
        text: 'اعادة البدء',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'ضحك الوحش وأنت تختبئ خلف درعك وأكلتك',
    options: [
      {
        text: 'اعادة البدء',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'لقد رميت جرة اللزجة على الوحش وانفجرت. بعد أن هدأ الغبار رأيت الوحش قد دُمّر. عند رؤية انتصارك ، قررت المطالبة بهذه القلعة على أنها ملكك وتعيش بقية أيامك هناك',
    options: [
      {
        text: 'تهانينا. العب مرة أخرى',
        nextText: -1
      }
    ]
  }
]

startGame()