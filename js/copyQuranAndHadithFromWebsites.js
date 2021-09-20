//surahNamesPack as a object from https://www.hadithbd.com/quran/
//surah names
const quranTable_ = document.querySelectorAll(`#quranTable`);

const surahNamesPack = [];
quranTable_.forEach((table, i) => {
  let obj = {
    type: "",
    ayahs: "",
    no: "",
    bangla: "",
    english: "",
    arabic: "",
    meanBangla: "",
    meanEnglish: "",
  };

  obj.no = i + 1;

  obj.type = table.children[0].children[1].innerText;
  obj.ayahs = table.children[0].children[2].innerText;

  let first_ = table.children[0].children[0].children[0].innerText;
  let tempFirst_ = ``;

  Array.from(first_).forEach((txt) => {
    if (isNaN(txt)) {
      tempFirst_ += txt;
    }
  });

  let splitedTempFirst = tempFirst_.split("|");
  splitedTempFirst.forEach((txt, i) => {
    if (i === 0) {
      obj.bangla = txt;
    } else if (i === 1) {
      obj.english = txt;
    } else if (i === 2) {
      obj.arabic = txt;
    }
  });

  let second_;

  if (i + 1 !== 74) {
    second_ = table.children[0].children[0].children[2].innerText;

    let splitedTempSecond = second_.split("|");
    splitedTempSecond.forEach((txt, i) => {
      if (i === 0) {
        obj.meanBangla = txt.trim();
      } else if (i === 1) {
        obj.meanEnglish = txt.trim();
      }
    });
  }

  surahNamesPack.push(obj);
});

const surahNamesPackStringifiedVersion = JSON.stringify(surahNamesPack);
console.log(surahNamesPackStringifiedVersion);

//packSurah as a object from http://www.quraanshareef.org/
//ayahs
const Ayahs_ = document.querySelectorAll("div.ayah");

const packSurah = [];
Ayahs_.forEach((ayah) => {
  let obj = { id: null, arabic: "", bangla: "", english: "" };
  Array.from(ayah.children).forEach((child, i) => {
    if (i === 0) {
      let firstTxt = child.innerText;
      let id_ = ``;
      Array.from(firstTxt).forEach((txt) => {
        if (!isNaN(txt)) {
          id_ += txt;
        }
      });
      obj.id = id_;
    } else if (i === 1) {
      obj.arabic = child.innerText;
    } else if (i === 2) {
      obj.bangla = child.innerText;
    } else {
      obj.english = child.innerText;
    }

    if (ayah.children.length === i + 1) {
      packSurah.push(obj);
    }
  });
});

const packSurahStringifiedVersion = JSON.stringify(packSurah);
console.log(packSurahStringifiedVersion);

//get hadis packed with object from http://ihadis.com/
//--//for books
const hadisBooksQuery = document.querySelectorAll("table.tg");

let hadisBooksPack = [];
Array.from(hadisBooksQuery).forEach((list, i) => {
  let obj = {
    no: "",
    bookName: "",
    totalHadith: "",
  };

  obj.no = list.children[0].children[0].children[0].innerText;
  obj.bookName = list.children[0].children[0].children[1].innerText;

  const convertBanglaToEnglishNumber = (str) => {
    let banglaNumber = {
      "০": 0,
      "১": 1,
      "২": 2,
      "৩": 3,
      "৪": 4,
      "৫": 5,
      "৬": 6,
      "৭": 7,
      "৮": 8,
      "৯": 9,
    };
    for (var x in banglaNumber) {
      str = str.replace(new RegExp(x, "g"), banglaNumber[x]);
    }
    return str;
  };

  let txtTotal = ``;
  Array.from(list.children[0].children[0].children[2].innerText).forEach(
    (txt) => {
      let converted_ = convertBanglaToEnglishNumber(txt);
      if (!isNaN(converted_)) {
        txtTotal += converted_;
      }
    }
  );
  obj.totalHadith = txtTotal.trim();

  hadisBooksPack.push(obj);
});

const hadisBooksPackStringifiedVersion = JSON.stringify(hadisBooksPack);
console.log(hadisBooksPackStringifiedVersion);

//--//for titles
const hadisListQuery = document.querySelectorAll("table.tg");

let hadisTitlesPack = [];
Array.from(hadisListQuery).forEach((list, i) => {
  let obj = { no: "", title: "", pages: "" };

  Array.from(list.children[0].children[0].children).forEach((child, i) => {
    if (i === 0) {
      obj.no = child.textContent;
    } else if (i === 1) {
      obj.title = child.children[0].textContent;
    } else if (i === 2) {
      obj.pages = child.textContent;
    }
  });

  hadisTitlesPack.push(obj);
});

const hadisTitlesPackStringifiedVersion = JSON.stringify(hadisTitlesPack);
console.log(hadisTitlesPackStringifiedVersion);

//--//for hadiths..
//chapter
const hadisChapter = document.querySelector(".rl");
let currentChapter = {};
let hadithsPack = [];

Array.from(hadisChapter.children).forEach((child) => {
  //chapter
  //hadiths-list
  if (child.className.includes(`chapter`)) {
    let objChapter = {};

    if (child.children.length === 2) {
      objChapter = {
        chapterName: child.children[0].innerText,
        title: child.children[1].innerText,
      };
    } else if (child.children.length === 4) {
      objChapter = {
        chapterName: child.children[0].innerText,
        title: child.children[1].innerText,
        about: child.children[3].innerText,
      };
    }

    currentChapter = objChapter;
  } else if (child.className.includes(`hadiths-list`)) {
    Array.from(child.children).forEach((child) => {
      let obj = {
        currentChapter: "",
        no: "",
        arabic: "",
        narrationFrom: "",
        bangla: "",
        footNote: "",
        grade: "",
      };

      obj.currentChapter = currentChapter;

      Array.from(child.children).forEach((child, i) => {
        if (child.children.length === 1) {
          obj.footNote = child.children[0].innerText;
        } else if (child.children.length === 2) {
          let lenUp_2 = child.children[0].children;

          if (lenUp_2.length === 1) {
            obj.grade = lenUp_2[0].textContent;
          } else {
            obj.no = lenUp_2[0].innerText;
            obj.arabic = lenUp_2[2].innerText;
            obj.narrationFrom = lenUp_2[3].innerText;
            obj.bangla = lenUp_2[4].innerText;
          }
        }
      });

      hadithsPack.push(obj);
    });
  }
});

const hadithsPackStringifiedVersion = JSON.stringify(hadithsPack);
console.log(hadithsPackStringifiedVersion);
