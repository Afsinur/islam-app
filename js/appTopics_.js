//querySelectors
let app_ = document.querySelector("div.app");
const top_ = document.querySelector("div.top_");
const selections_ = document.querySelector("div.selections_");
const loader_ = document.querySelector("div.loader_");
const copyType_div = document.querySelectorAll("div.copyType > div");
const translateCopy_ = document.querySelector("div.translateCopy");
const CopyPreviewedOne_ = document.querySelector("div.CopyPreviewedOne");
const previewOn_ = document.querySelector("div.previewOn");
const previewOn_1 = document.querySelector("div.previewOn_1");
const _copyWhat = document.querySelectorAll("span.copyWhat");
const _detail_preview = document.querySelector("div.enlarge_preview");
const _ok = document.querySelector("div.enlarge_preview > button");
const copyDivTextContainer_ = document.querySelector(
  "div.copyDivTextContainer"
);

//javascript styles

//variables
const jsonPTH = `https://raw.githubusercontent.com/Afsinur/islam-app/master/json/`; //`../json/`; / for github deploy https://raw.githubusercontent.com/Afsinur/islam-app/master/json/
let appTopicDiv,
  selectioned,
  selectioned_1,
  selectioned_2,
  mouseDowned,
  singleTXTcpy,
  allTXTcpy,
  largePreviewTXT;
const appTopics_ = [
  {
    arabicTitle: "اقرأ القرآن",
    banglaTitle: "কোরআন পড়ুন",
    englishTitle: "Read Quran",
  },
  {
    arabicTitle: "",
    banglaTitle: "হাদিস পড়ুন",
    englishTitle: "",
  },
];
const navRoutes = [
  { router: "Islam-app" },
  { router: "Quran" },
  { router: "Hadiths" },
  { router: "Surahs" },
];
const loadThisManyTimes = 15;
let incLoadByNumber = 10;
let scrollAddBefore = 50;
let mouseDownCount = 0;
let bodyMouseDownedWhenGoingToCopyCount = 0;
let scrollToGetCount = 0;
let currentPageScrollingOn = null;
let scrollSpark = 0;
let drkCnd = 0;

//objects
const tamplateString = {
  quran_index: (i, data) => {
    return `
  <div class="surahCollectionDiv" data-callsurah="${i + 1}">
   <div data-callsurah="${i + 1}">  
    <div data-callsurah="${i + 1}">
     <span class="spanBanFont" data-callsurah="${i + 1}">${data.bangla}</span>
     |
     <span class="spanEngFont" data-callsurah="${i + 1}">${data.english}</span>
     |
     <span class="spanBanFont" data-callsurah="${i + 1}">${data.arabic}</span>
    </div>

    <div data-callsurah="${i + 1}">
      <span class="spanBanFont" data-callsurah="${i + 1}">${
      data.meanBangla
    }</span>
     | 
     <span class="spanEngFont" data-callsurah="${i + 1}">${
      data.meanEnglish
    }</span>
          </div>
   </div>

   <div data-callsurah="${i + 1}">
      <div><span class="spanBanFont" data-callsurah="${i + 1}">${
      data.ayahs
    }</span></div>
      <div><span class="spanBanFont" data-callsurah="${i + 1}">${
      data.type
    }</span></div>
   </div>
  </div>
  `;
  },
  quran_slect: (i, data) => {
    return `
  <option value="${i + 1}">
  <span class="spanBanFont">${data.bangla}</span>
      |
      <span class="spanEngFont">${data.english}</span>
      |
      <span class="spanBanFont">${data.arabic}</span>
      |
      ( <span class="spanBanFont">${data.ayahs}</span> )
  </option>
 `;
  },
  ayahs_: (i, e, data) => {
    return `
  <div class="singleSurahTexts" data-currentsurahtext="${
    i + 1
  }" data-currentsurahlive="${e}">
   <div data-currentsurahtext="${i + 1}" data-currentsurahlive="${e}">
    <span class="spanEngFont1 surahNo" data-currentsurahtext="${
      i + 1
    }" data-currentsurahlive="${e}">${data.id}</span>
   </div>

   <div data-currentsurahtext="${i + 1}" data-currentsurahlive="${e}">
    <span class="spanBanFont1 surahArb" data-currentsurahtext="${
      i + 1
    }" data-currentsurahlive="${e}">${data.arabic}</span><br><br>

    <span class="spanBanFont1" data-currentsurahtext="${
      i + 1
    }" data-currentsurahlive="${e}">${data.bangla}</span><br><br>
   
    <span class="spanEngFont1" data-currentsurahtext="${
      i + 1
    }" data-currentsurahlive="${e}">${data.english}</span>
   </div>
  </div>
  `;
  },
  QrnsingleTXTcpy: (currentsurahlive, currentsurahtext, data) => {
    return `
    <p>Quran( ${currentsurahlive}: ${currentsurahtext} )</p>
    <p>${data.arabic}</p>
    <p>${data.bangla}</p>
    <p>${data.english}</p>
    `;
  },
  QrnallTXTcpy: (currentsurahlive, data, i) => {
    return `
    <p>Quran( ${currentsurahlive}: ${i + 1} )</p>
    <p>${data.arabic}</p>
    <p>${data.bangla}</p>
    <p>${data.english}</p>
    `;
  },
  Hdbks_: (i, data) => {
    return `
  <div class="surahCollectionDiv" data-callbooks="books" data-callsurah="${
    i + 1
  }">
   <div data-callbooks="books" data-callsurah="${i + 1}">  
    <div data-callbooks="books" data-callsurah="${i + 1}">
     <span class="spanBanFont" data-callbooks="books" data-callsurah="${
       i + 1
     }">${data.no}</span>
     |
     <span class="spanBanFont" data-callbooks="books" data-callsurah="${
       i + 1
     }">${data.bookName}</span>
    </div>
   </div>

   <div data-callbooks="books" data-callsurah="${i + 1}">
      <div><span class="spanBanFont" data-callbooks="books" data-callsurah="${
        i + 1
      }">${data.totalHadith}</span></div>
   </div>
  </div>
  `;
  },
  HDbk_slect: (i, data) => {
    return `
  <option value="${i + 1}">
  <span class="spanBanFont">${data.no}</span>
      |
      <span class="spanBanFont">${data.bookName}</span>
      |
      ( <span class="spanBanFont">${data.totalHadith}</span> )
  </option>
 `;
  },
  HDbooksCP: (i, data) => {
    return `
  <div class="surahCollectionDiv" data-callbooks="chapters" data-callsurah="${
    i + 1
  }">
   <div data-callbooks="chapters" data-callsurah="${i + 1}">  
    <div data-callbooks="chapters" data-callsurah="${i + 1}">
     <span class="spanBanFont" data-callbooks="chapters" data-callsurah="${
       i + 1
     }">${data.no}</span>
     |
     <span class="spanBanFont" data-callbooks="chapters" data-callsurah="${
       i + 1
     }">${data.title}</span>
    </div>
   </div>

   <div data-callbooks="chapters" data-callsurah="${i + 1}">
      <div><span class="spanBanFont" data-callbooks="chapters" data-callsurah="${
        i + 1
      }">${data.pages}</span></div>
   </div>
  </div>
  `;
  },
  HDbkCPSlect_: (i, data) => {
    return `
     <option value="${i + 1}">
     <span class="spanBanFont">${data.no}</span>
         |
         <span class="spanBanFont">${data.title}</span>
         |
         ( <span class="spanBanFont">${data.pages}</span> )
     </option>
    `;
  },
  singleHD: (e, i, data) => {
    return `
    <div class="singleSurahTexts" data-currentsurahtext="${
      i + 1
    }" data-currentsurahlive="${e}">
     <div data-currentsurahtext="${i + 1}" data-currentsurahlive="${e}">
      <span class="spanEngFont1 surahNo" data-currentsurahtext="${
        i + 1
      }" data-currentsurahlive="${e}">${data.no}</span>
     </div>

     <div data-currentsurahtext="${i + 1}" data-currentsurahlive="${e}">
      <span class="spanBanFont1 surahArb" data-currentsurahtext="${
        i + 1
      }" data-currentsurahlive="${e}">${data.currentChapter.chapterName}<br>${
      data.currentChapter.title
    }<br>${
      data.currentChapter.about != undefined
        ? data.currentChapter.about
        : (data.currentChapter.about = "")
    }</span><br><br>

      <span class="spanBanFont1 surahArb" data-currentsurahtext="${
        i + 1
      }" data-currentsurahlive="${e}">${remainLineBrk(
      data.arabic
    )}</span><br><br>

      <span class="spanBanFont1" data-currentsurahtext="${
        i + 1
      }" data-currentsurahlive="${e}">${data.narrationFrom}<br>${remainLineBrk(
      data.bangla
    )}</span><br><br>
     
      <span class="spanBanFont1 footNote_" data-currentsurahtext="${
        i + 1
      }" data-currentsurahlive="${e}">${remainLineBrk(data.footNote)}</span>

      <span class="spanBanFont1 grade_" style="background:${colorReturn(
        data.grade
      )}" data-currentsurahtext="${i + 1}" data-currentsurahlive="${e}">${
      data.grade
    }</span>
     </div>
    </div>
    `;
  },
  HDsingleTXTcpy: (data) => {
    return `
                <p>Hadith( ${selectioned_1.value}: ${selectioned_1.value} | ${
      data.no
    } )</p>
                <p>${data.currentChapter.chapterName}</p>
                <p>${data.currentChapter.title}</p>
                <p>${
                  data.currentChapter.about != undefined
                    ? data.currentChapter.about
                    : (data.currentChapter.about = "")
                }</p>
                <p>${remainLineBrk(data.arabic)}</p>
                <p>${data.narrationFrom}<br>${remainLineBrk(data.bangla)}</p>
                <p>${remainLineBrk(data.footNote)}</p>
                <p>${data.grade}</p>
                `;
  },
  HDallTXTcpy: (data) => {
    return `
                <p>Hadith( ${selectioned_1.value}: ${selectioned_1.value} | ${
      data.no
    } )</p>
                <p>${data.currentChapter.chapterName}</p>
                <p>${data.currentChapter.title}</p>
                <p>${
                  data.currentChapter.about != undefined
                    ? data.currentChapter.about
                    : (data.currentChapter.about = "")
                }</p>
                <p>${remainLineBrk(data.arabic)}</p>
                <p>${data.narrationFrom}<br>${remainLineBrk(data.bangla)}</p>
                <p>${remainLineBrk(data.footNote)}</p>
                <p>${data.grade}</p>
                `;
  },
};
const mtcPages = {
  _Quran: {
    cond_1: "Ayah",
    cond_2: "Surahs",
    cond_3: "Ayahs",
  },
  _Hadith: {
    cond_1: "Hadith",
    cond_2: "Books",
    cond_3: "Chapters",
    cond_4: "Hadiths",
  },
};
const currentQuranOrHadithChapter = {
  surahIndex: null,
  allSurah: [],
  HDbookNameIndex: null,
  HDbooksWithChapter: [],
  packOfChaptersHD: [],
};

//GET
const Get_Data = async (url) => {
  const returned = await fetch(url);
  const data = await returned.json();
  return data;
};

//functions
const bodyDRK = (drkCnd) => {
  if (drkCnd === 1) {
    document.body.style.background = `#505050`;
  } else {
    document.body.style.background = `#e0e0e0`;
  }
};

const darkMOd = (drkCnd) => {
  if (drkCnd === 1) {
    document.querySelectorAll(".singleSurahTexts").forEach((span) => {
      span.style.background = `#121212`;
      span.style.color = `#b9b9b9`;
    });

    document.querySelectorAll(".surahCollectionDiv").forEach((span) => {
      span.style.background = `#121212`;
      Array.from(span.children).forEach((cld) => {
        cld.style.color = `#b9b9b9`;
      });
    });
  } else {
    document.querySelectorAll(".singleSurahTexts").forEach((span) => {
      span.style.background = `#f5f0f0`;
      span.style.color = `#404040`;
    });

    document.querySelectorAll(".surahCollectionDiv").forEach((span) => {
      span.style.background = `#f5f0f0`;
      Array.from(span.children).forEach((cld) => {
        cld.style.color = `#404040`;
      });
    });
  }
};

const mousemoveVol = () => {
  incLoadByNumber = parseInt(vol.value);
  if (parseInt(vol.value) > 30) {
    document.querySelector(
      ".VOL"
    ).innerHTML = `${vol.value} <span style="color:#de0000">High risk!</span>`;
  } else {
    document.querySelector(".VOL").innerHTML = `${vol.value}`;
  }
};

const VOL_value = () => {
  vol.value = incLoadByNumber;
  document.querySelector(".VOL").innerHTML = `${vol.value}`;
};

const hideSettings = (e) => {
  let cond_1 = "settingsDiv";

  if (e.target.className.includes(cond_1)) {
    document.querySelector("div.settingsDiv").style.display = "none";
  }
};

const changeHeightApp_ = () => {
  app_ = document.querySelector("div.app");

  app_.style.height = `${
    document.body.clientHeight -
    document.querySelector("div.top_").clientHeight -
    50
  }px`;
};

const colorReturn = (data) => {
  if (
    data === "সহিহ হাদিস" ||
    data === "হাসান সহিহ" ||
    data === "হাসান হাদিস"
  ) {
    return "#4caf50";
  } else if (data === "দুর্বল হাদিস") {
    return "#f44336";
  } else {
    return "#607d8b";
  }
};

const commonCondMtc = () => {
  let CinrTxt = _copyWhat[0].innerText;
  let Cpg = currentPageScrollingOn;

  if (CinrTxt === mtcPages._Quran.cond_1 && Cpg === mtcPages._Quran.cond_2) {
    return 1;
  } else if (
    CinrTxt === mtcPages._Quran.cond_1 &&
    Cpg === mtcPages._Quran.cond_3
  ) {
    return 2;
  }

  //mtcPages._Hadith.cond_1
  if (CinrTxt === mtcPages._Hadith.cond_1 && Cpg === mtcPages._Hadith.cond_2) {
    return 3;
  } else if (
    CinrTxt === mtcPages._Hadith.cond_1 &&
    Cpg === mtcPages._Hadith.cond_3
  ) {
    return 4;
  } else if (
    CinrTxt === mtcPages._Hadith.cond_1 &&
    Cpg === mtcPages._Hadith.cond_4
  ) {
    return 5;
  }
};

const srlTop_ = (e, e1) => {
  setTimeout(() => {
    let obj_ = { behavior: "smooth", block: "end", inline: "nearest" };
    document.querySelector(`#${e}`).scrollIntoView(obj_);
  }, e1);
};

const addItems = () => {
  scrollSpark++;

  if (currentPageScrollingOn != null) {
    //mtcPages._Quran.cond_1
    const commonFunc = (e) => {
      let scrollHeight__ = app_.scrollHeight - scrollAddBefore;
      if (
        app_.scrollTop + app_.offsetHeight >= scrollHeight__ &&
        scrollSpark > 5
      ) {
        let forward_ = (scrollToGetCount += incLoadByNumber);
        let i = forward_ - incLoadByNumber;
        if (e === 1) {
          while (i < forward_) {
            let data;
            if (currentQuranOrHadithChapter.surahIndex.length > i) {
              data = currentQuranOrHadithChapter.surahIndex[i];
            }

            if (data !== undefined) {
              app_.innerHTML += tamplateString.quran_index(i, data);
            }

            i++;
          }
        }

        if (e === 2) {
          while (i < forward_) {
            let e_i = i;
            let data;
            currentQuranOrHadithChapter.allSurah.forEach((surah, i) => {
              if (surah.surahNo === selectioned.value) {
                if (
                  currentQuranOrHadithChapter.allSurah[i].ayahs.length > e_i
                ) {
                  data = currentQuranOrHadithChapter.allSurah[i].ayahs[e_i];
                }
              }
            });

            if (data !== undefined) {
              app_.innerHTML += tamplateString.ayahs_(i, e, data);
            }

            i++;
          }
        }

        if (e === 3) {
          while (i < forward_) {
            let data;

            if (currentQuranOrHadithChapter.HDbookNameIndex.length > i) {
              data = currentQuranOrHadithChapter.HDbookNameIndex[i];
            }

            if (data !== undefined) {
              app_.innerHTML += tamplateString.Hdbks_(i, data);
            }

            i++;
          }
        }

        if (e === 4) {
          while (i < forward_) {
            let e_i = i;
            let data;

            currentQuranOrHadithChapter.HDbooksWithChapter.forEach(
              (cpter, i) => {
                if (cpter.bookNo === selectioned_1.value) {
                  if (
                    currentQuranOrHadithChapter.HDbooksWithChapter[i].chapters
                      .length > e_i
                  ) {
                    data =
                      currentQuranOrHadithChapter.HDbooksWithChapter[i]
                        .chapters[e_i];
                  }
                }
              }
            );

            if (data !== undefined) {
              app_.innerHTML += tamplateString.HDbooksCP(i, data);
            }

            i++;
          }
        }

        if (e === 5) {
          while (i < forward_) {
            let e_i = i;
            let data;

            currentQuranOrHadithChapter.packOfChaptersHD.forEach((pack, i) => {
              if (
                pack.bookNo === selectioned_1.value &&
                pack.chapterNo === selectioned_2.value
              ) {
                if (
                  currentQuranOrHadithChapter.packOfChaptersHD[i].chapterHadiths
                    .length > e_i
                ) {
                  data =
                    currentQuranOrHadithChapter.packOfChaptersHD[i]
                      .chapterHadiths[e_i];
                }
              }
            });

            if (data !== undefined) {
              app_.innerHTML += tamplateString.singleHD(e, i, data);
            }

            i++;
          }
        }

        darkMOd(drkCnd);
      }
    };

    let cmdCond_ = commonCondMtc();
    commonFunc(cmdCond_);
  }
};

const remainLineBrk = (str) => {
  return (str = str.replace(new RegExp("\n", "g"), "<br>"));
};

const okClose_ = () => {
  _detail_preview.style.display = `none`;
};

const enlarge_ = () => {
  _detail_preview.children[0].innerHTML = previewOn_.innerHTML;
  _detail_preview.style.display = `flex`;
};

const hideCopy = (e) => {
  let targeted1, targeted2, targeted3, targeted4, targeted5, targeted6;

  if (e.target !== null) {
    targeted1 = e.target.className;
  }
  if (e.target.parentNode !== null) {
    targeted2 = e.target.parentNode.className;
  }
  if (e.target.parentNode.parentNode !== null) {
    targeted3 = e.target.parentNode.parentNode.className;
  }
  if (e.target.parentNode.parentNode.parentNode !== null) {
    targeted4 = e.target.parentNode.parentNode.parentNode.className;
  }
  if (e.target.parentNode.parentNode.parentNode.parentNode !== null) {
    targeted5 = e.target.parentNode.parentNode.parentNode.parentNode.className;
  }
  if (
    e.target.parentNode.parentNode.parentNode.parentNode.parentNode !== null
  ) {
    targeted6 =
      e.target.parentNode.parentNode.parentNode.parentNode.parentNode.className;
  }

  let cond_1 = "dontHide";

  if (
    !(
      targeted1 === cond_1 ||
      targeted2 === cond_1 ||
      targeted3 === cond_1 ||
      targeted4 === cond_1 ||
      targeted5 === cond_1 ||
      targeted6 === cond_1
    )
  ) {
    copyDivTextContainer_.style.display = `none`;
  }
};

const CopyTXT_ = () => {
  translateCopy_.style.transform = `translateX(0px)`;
  if (previewOn_1.innerHTML === "") {
    navigator.clipboard.writeText(previewOn_.innerText);
  } else {
    navigator.clipboard.writeText(previewOn_1.innerText);
  }
};

const translateCopy = (e) => {
  if (bodyMouseDownedWhenGoingToCopyCount !== 1) {
    translateCopy_.style.transform = `translateX(-285px)`;

    const async_load = () => {
      loadNow();
      previewOn_.innerHTML = largePreviewTXT;
      previewOn_1.innerHTML = allTXTcpy;
      stopLoad();
    };

    const single_load = () => {
      loadNow();
      previewOn_.innerHTML = singleTXTcpy;
      previewOn_1.innerHTML = "";
      stopLoad();
    };

    if (e.target.innerText.includes("Copy all")) {
      async_load();
    } else if (e.target.innerText.includes("Copy this")) {
      single_load();
    } else {
      if (e.target.parentNode.innerText.includes(`Copy all`)) {
        async_load();
      } else {
        single_load();
      }
    }
  }

  bodyMouseDownedWhenGoingToCopyCount = 0;
};

const getOnePackSelected = () =>
  getOnePack(selectioned.value, _copyWhat[0].innerText, null);

const getOnePackSelected_1 = () =>
  getOnePack(selectioned_1.value, _copyWhat[0].innerText, `books`);

const getOnePackSelected_2 = () =>
  getOnePack(selectioned_2.value, _copyWhat[0].innerText, `chapters`);

const getOnePack = async (e, e2, e3) => {
  loadNow();

  app_.innerHTML = ``;
  app_.innerHTML += `<div id="SrllTop"></div>`;

  let child_forEach = (child, i) => {
    if (i + 1 === parseInt(e)) {
      child.setAttribute("selected", "selected");
    } else {
      child.removeAttribute("selected");
    }
  };

  //${JSON.stringify(data)}
  if (e2 === "Ayah") {
    currentPageScrollingOn = "Ayahs";
    scrollToGetCount = loadThisManyTimes;
    scrollSpark = 0;

    selectioned.removeAttribute("style");
    Array.from(selectioned.children).forEach(child_forEach);

    let data;
    let mtch = 0;
    const sameForEach = (surah) => {
      if (surah.surahNo === e) {
        surah.ayahs.forEach((data, i) => {
          if (loadThisManyTimes > i) {
            app_.innerHTML += tamplateString.ayahs_(i, e, data);
          }
        });
      }
    };

    currentQuranOrHadithChapter.allSurah.forEach((surah) => {
      if (surah.surahNo === e) {
        mtch = 1;
      }
    });
    if (mtch === 0) {
      data = await Get_Data(`${jsonPTH}quran/surahs/${e}.json`);

      currentQuranOrHadithChapter.allSurah.push({ surahNo: e, ayahs: data });

      currentQuranOrHadithChapter.allSurah.forEach(sameForEach);
    } else {
      currentQuranOrHadithChapter.allSurah.forEach(sameForEach);
      srlTop_("SrllTop", 150);
    }

    darkMOd(drkCnd);
  } else {
    if (e3 === `books`) {
      currentPageScrollingOn = "Chapters";
      scrollToGetCount = loadThisManyTimes;
      scrollSpark = 0;

      selectioned_1.removeAttribute("style");
      if (selectioned_2 != undefined) {
        selectioned_2.setAttribute("style", "display:none");
      }
      Array.from(selectioned_1.children).forEach(child_forEach);

      let data;
      let mtch = 0;
      let selectionTxt = ``;
      const sameForEach = (book) => {
        if (book.bookNo === e) {
          book.chapters.forEach((data, i) => {
            //${JSON.stringify(data)}
            selectionTxt += tamplateString.HDbkCPSlect_(i, data);

            if (loadThisManyTimes > i) {
              app_.innerHTML += tamplateString.HDbooksCP(i, data);
            }
          });
        }
      };

      currentQuranOrHadithChapter.HDbooksWithChapter.forEach((book) => {
        if (book.bookNo === e) {
          mtch = 1;
        }
      });
      if (mtch === 0) {
        data = await Get_Data(`${jsonPTH}hadiths/${e}/${e}_Index.json`);

        currentQuranOrHadithChapter.HDbooksWithChapter.push({
          bookNo: e,
          chapters: data,
        });

        currentQuranOrHadithChapter.HDbooksWithChapter.forEach(sameForEach);
      } else {
        currentQuranOrHadithChapter.HDbooksWithChapter.forEach(sameForEach);
        srlTop_("SrllTop", 150);
      }

      selections_.innerHTML += `
          <div id="slcScrll"></div>
          <span>
            <select name="surahSelect_2" style="display:none"></select>
          </span>
          `;

      selectioned_2 = document.querySelector(`select[name="surahSelect_2"]`);
      selectioned_2.innerHTML = selectionTxt;

      selectioned_2.addEventListener("change", getOnePackSelected_2);

      selectioned_1 = document.querySelector(`select[name="surahSelect_1"]`);
      selectioned_1.addEventListener("change", getOnePackSelected_1);

      darkMOd(drkCnd);
    } else {
      setTimeout(() => {
        srlTop_("slcScrll", 150);
      }, 500);

      currentPageScrollingOn = "Hadiths";
      scrollToGetCount = loadThisManyTimes;
      scrollSpark = 0;

      selectioned_2.removeAttribute("style");
      selectioned_1 = document.querySelector(`select[name="surahSelect_1"]`);
      Array.from(selectioned_2.children).forEach(child_forEach);

      let data;
      let mtch = 0;
      const sameForEach = (pack) => {
        if (pack.bookNo === selectioned_1.value && pack.chapterNo === e) {
          pack.chapterHadiths.forEach((data, i) => {
            //${JSON.stringify(data)}
            if (loadThisManyTimes > i) {
              app_.innerHTML += tamplateString.singleHD(e, i, data);
            }
          });
        }
      };
      currentQuranOrHadithChapter.packOfChaptersHD.forEach((pack) => {
        if (pack.chapterNo === e && pack.bookNo === selectioned_1.value) {
          mtch = 1;
        }
      });
      if (mtch === 0) {
        data = await Get_Data(
          `${jsonPTH}hadiths/${selectioned_1.value}/${selectioned_1.value}_Chapter_${e}.json`
        );

        currentQuranOrHadithChapter.packOfChaptersHD.push({
          bookNo: selectioned_1.value,
          chapterNo: e,
          chapterHadiths: data,
        });

        currentQuranOrHadithChapter.packOfChaptersHD.forEach(sameForEach);
      } else {
        currentQuranOrHadithChapter.packOfChaptersHD.forEach(sameForEach);
        srlTop_("SrllTop", 150);
      }

      darkMOd(drkCnd);
    }
  }

  stopLoad();
};

const getOneItem = function (e) {
  let targeted1, targeted2, targeted3, targeted4;

  if (e.target !== null) {
    targeted1 = e.target.className;
  }
  if (e.target.parentNode !== null) {
    targeted2 = e.target.parentNode.className;
  }
  if (e.target.parentNode.parentNode !== null) {
    targeted3 = e.target.parentNode.parentNode.className;
  }
  if (e.target.parentNode.parentNode.parentNode !== null) {
    targeted4 = e.target.parentNode.parentNode.parentNode.className;
  }

  let targetedID = e.target.dataset.callsurah;
  let targetedHdB = e.target.dataset.callbooks;
  let cond_ = "surahCollectionDiv";
  let cond_1 = "singleSurahTexts";

  //surahCollectionDiv
  if (
    e.type !== "mousedown" &&
    e.type !== "touchstart" &&
    e.type !== "mouseup" &&
    e.type !== "touchcancel" &&
    e.type !== "touchend" &&
    e.type !== "touchmove"
  ) {
    if (
      targeted1 === cond_ ||
      targeted2 === cond_ ||
      targeted3 === cond_ ||
      targeted4 === cond_
    ) {
      if (_copyWhat[0].innerText === `Hadith`) {
        getOnePack(targetedID, _copyWhat[0].innerText, targetedHdB);
      } else {
        getOnePack(targetedID, _copyWhat[0].innerText, null);
      }
    }
  }

  //mousedown & mouseup
  if (e.type === "mousedown" || e.type === "touchstart") {
    if (
      targeted1 === cond_1 ||
      targeted2 === cond_1 ||
      targeted3 === cond_1 ||
      targeted4 === cond_1
    ) {
      mouseDowned = setInterval(() => {
        mouseDownCount++;

        if (mouseDownCount > 0) {
          clearInterval(mouseDowned);
          mouseDownCount = 0;
          bodyMouseDownedWhenGoingToCopyCount = 1;

          let currentsurahlive = e.target.dataset.currentsurahlive;
          let currentsurahtext = e.target.dataset.currentsurahtext;

          //${JSON.stringify(data)}
          singleTXTcpy = ``;
          allTXTcpy = ``;
          largePreviewTXT = ``;
          let data = ``;

          const commonFunc = (e) => {
            if (e === 2) {
              currentQuranOrHadithChapter.allSurah.forEach((itm, i) => {
                if (itm.surahNo === selectioned.value) {
                  data = currentQuranOrHadithChapter.allSurah[i].ayahs;
                }
              });
            }

            if (e === 5) {
              currentQuranOrHadithChapter.packOfChaptersHD.forEach(
                (pack, i) => {
                  if (
                    pack.bookNo === selectioned_1.value &&
                    pack.chapterNo === selectioned_2.value
                  ) {
                    data =
                      currentQuranOrHadithChapter.packOfChaptersHD[i]
                        .chapterHadiths;
                  }
                }
              );
            }
          };

          let cmdCond_ = commonCondMtc();
          commonFunc(cmdCond_);

          const largePreviewTXTentry = (up_dataLN, data, i, cond_string) => {
            const cond_ck = (cond_string) => {
              if (cond_string === "Hadith") {
                largePreviewTXT += tamplateString.HDallTXTcpy(data);
              } else {
                largePreviewTXT += tamplateString.QrnallTXTcpy(
                  currentsurahlive,
                  data,
                  i
                );
              }
            };

            if (loadThisManyTimes > i) {
              cond_ck(cond_string);
            } else if (loadThisManyTimes < i && up_dataLN === i + 1) {
              largePreviewTXT += `
              <p>. .</p>
              <p>. .</p>
              <p>. .</p>
              <p>. .</p>
              <p>. .</p>
              <p>. .</p>
              <p>. .</p>
              <p>. .</p>
              <p>. .</p>
              <p>. .</p>
              `;

              cond_ck(cond_string);
            }
          };

          const cmnForEach = (data, cond_string) => {
            let up_dataLN = data.length;

            if (cond_string === "Hadith") {
              data.forEach((data, i) => {
                largePreviewTXTentry(up_dataLN, data, i, "Hadith");

                if (parseInt(currentsurahtext) === i + 1) {
                  singleTXTcpy = tamplateString.HDsingleTXTcpy(data);

                  allTXTcpy += tamplateString.HDallTXTcpy(data);
                } else {
                  allTXTcpy += tamplateString.HDallTXTcpy(data);
                }
              });
            } else {
              data.forEach((data, i) => {
                largePreviewTXTentry(up_dataLN, data, i, "Quran");

                if (parseInt(currentsurahtext) === i + 1) {
                  singleTXTcpy = tamplateString.QrnsingleTXTcpy(
                    currentsurahlive,
                    currentsurahtext,
                    data
                  );

                  allTXTcpy += tamplateString.QrnallTXTcpy(
                    currentsurahlive,
                    data,
                    i
                  );
                } else {
                  allTXTcpy += tamplateString.QrnallTXTcpy(
                    currentsurahlive,
                    data,
                    i
                  );
                }
              });
            }
          };

          if (_copyWhat[0].innerText === "Hadith") {
            cmnForEach(data, "Hadith");
          } else {
            cmnForEach(data, "Quran");
          }

          _detail_preview.style.display = `none`;
          translateCopy_.style.transform = `translateX(0px)`;
          copyDivTextContainer_.style.display = `block`;
        }
      }, 2000);
    }
  }

  if (
    e.type === "mouseup" ||
    e.type === "touchcancel" ||
    e.type === "touchend" ||
    e.type === "touchmove"
  ) {
    clearInterval(mouseDowned);
    mouseDownCount = 0;
  }
};

const goQuranHome = async () => {
  changeHeightApp_();

  _copyWhat.forEach((wt) => {
    wt.innerText = `Ayah`;
  });
  currentPageScrollingOn = "Surahs";
  scrollToGetCount = loadThisManyTimes;
  scrollSpark = 0;

  //app_.innerHTML+=;
  app_.innerHTML = ``;
  app_.innerHTML += `<div id="SrllTop"></div>`;
  let data;
  let selectionTxt = ``;
  const sameForEach = (data, i) => {
    //${JSON.stringify(data)}
    selectionTxt += tamplateString.quran_slect(i, data);

    if (loadThisManyTimes > i) {
      app_.innerHTML += tamplateString.quran_index(i, data);
    }
  };

  if (currentQuranOrHadithChapter.surahIndex === null) {
    data = await Get_Data(`${jsonPTH}quran/surah_Index.json`);

    currentQuranOrHadithChapter.surahIndex = data;

    currentQuranOrHadithChapter.surahIndex.forEach(sameForEach);
  } else {
    currentQuranOrHadithChapter.surahIndex.forEach(sameForEach);
    srlTop_("SrllTop", 150);
  }

  top_.innerHTML = `
        <span>Islam-app</span>
        |
        <span>Quran</span>
        `;

  selections_.innerHTML = `
        <span>Surahs</span>
        <span><select name="surahSelect" style="display:none">
          
        </select></span>
        `;

  selectioned = document.querySelector(`select[name="surahSelect"]`);
  selectioned.innerHTML = selectionTxt;

  selectioned.addEventListener("change", getOnePackSelected);

  darkMOd(drkCnd);
  stopLoad();
};

const goHadithsHome = async () => {
  changeHeightApp_();

  _copyWhat.forEach((wt) => {
    wt.innerText = `Hadith`;
  });
  currentPageScrollingOn = "Books";
  scrollToGetCount = loadThisManyTimes;
  scrollSpark = 0;

  //app_.innerHTML+=;
  app_.innerHTML = ``;
  app_.innerHTML += `<div id="SrllTop"></div>`;
  let data;
  let selectionTxt = ``;
  const sameForEach = (data, i) => {
    //${JSON.stringify(data)}
    selectionTxt += tamplateString.HDbk_slect(i, data);

    if (loadThisManyTimes > i) {
      app_.innerHTML += tamplateString.Hdbks_(i, data);
    }
  };

  if (currentQuranOrHadithChapter.HDbookNameIndex === null) {
    data = await Get_Data(`${jsonPTH}hadiths/book_Name_index.json`);

    currentQuranOrHadithChapter.HDbookNameIndex = data;

    currentQuranOrHadithChapter.HDbookNameIndex.forEach(sameForEach);
  } else {
    currentQuranOrHadithChapter.HDbookNameIndex.forEach(sameForEach);
    srlTop_("SrllTop", 150);
  }

  top_.innerHTML = `
        <span>Islam-app</span>
        |
        <span>Hadiths</span>
        `;

  selections_.innerHTML = `
        <span>Hadiths</span>
        
        <span><select name="surahSelect_1" style="display:none">
          
        </select></span>
        `;

  selectioned_1 = document.querySelector(`select[name="surahSelect_1"]`);
  selectioned_1.innerHTML = selectionTxt;

  darkMOd(drkCnd);
  stopLoad();
};

const loadNow = () => (loader_.style.display = "block");
const stopLoad = () => (loader_.style.display = "none");

const goHome = (e) => {
  if (e.target.innerText === navRoutes[0].router) {
    changeHeightApp_();
    currentPageScrollingOn = null;

    loadNow();
    resetAppTopicSection();

    top_.innerHTML = `
      <span class="islam_app_span">Islam-app</span>
    `;

    selections_.innerHTML = ``;

    stopLoad();
  } else if (e.target.innerText === navRoutes[1].router) {
    loadNow();
    goQuranHome();
  } else if (e.target.innerText === navRoutes[2].router) {
    loadNow();
    goHadithsHome();
  } else if (e.target.innerText === navRoutes[3].router) {
    loadNow();
    goQuranHome();
  }
};

const resetAppTopicSection = () => {
  app_ = document.querySelector("div.app");
  app_.innerHTML = ``;
  app_.innerHTML += `<div id="SrllTop"></div>`;
  srlTop_("SrllTop", 1);

  setVariables();
  appTopics_init();
};

const setVariables = () => {
  app_.innerHTML += `<div class="appTopicDiv"></div>`;
  appTopicDiv = document.querySelector("div.appTopicDiv");
};

const AppTopicAnimationEnd = function (e) {
  this.removeAttribute("style");
};

const AppTopicClicked = (e) => {
  const ContainerDiv = e.target.parentNode.className.includes(`appTopicDiv`);
  const buttonItself = e.target.parentNode.className.includes(`appTopic_`);

  if (ContainerDiv || buttonItself) {
    let number_ = e.target.dataset.topicid;
    if (!isNaN(number_)) {
      loadNow();
      app_.innerHTML = ``;

      if (number_ === "1") {
        goQuranHome();
      } else {
        goHadithsHome();
      }
    }
  }
};

const appTopics_ForEach = (topic, i) => {
  appTopicDiv.innerHTML += `
        <button data-topicid="${i + 1}" class="appTopic_ appTp_${i + 1}">
            <span data-topicid="${i + 1}" class="tp_sp tp_sp_${i + 1}">
                ${topic.arabicTitle}
            </span>            

            <span data-topicid="${i + 1}" class="tp_sp tp_sp_${i + 2}">
               ${topic.banglaTitle}
            </span>            

            <span data-topicid="${i + 1}" class="tp_sp tp_sp_${i + 3}">
                ${topic.englishTitle}
            </span>
        </button>
    `;

  if (appTopics_.length === i + 1) {
    document
      .querySelectorAll(`button.appTopic_`)
      .forEach((selectedTopic, i) => {
        selectedTopic.addEventListener("click", AppTopicClicked);
        selectedTopic.addEventListener("animationend", AppTopicAnimationEnd);

        if (i === 0) {
          selectedTopic.style.animation = `_top 800ms cubic-bezier(0.74, -0.25, 0.27, 1.55) 1 forwards`;
        } else {
          selectedTopic.style.animation = `_bottom 800ms cubic-bezier(0.74, -0.25, 0.27, 1.55) 1 forwards`;
        }
      });
  }
};

const appTopics_init = () => {
  setVariables();
  appTopics_.forEach(appTopics_ForEach);
};

//event handlers
top_.addEventListener("click", goHome);
selections_.addEventListener("click", goHome);
app_.addEventListener("click", getOneItem);
app_.addEventListener("mousedown", getOneItem);
app_.addEventListener("mouseup", getOneItem);
app_.addEventListener("touchstart", getOneItem);
app_.addEventListener("touchcancel", getOneItem);
app_.addEventListener("touchend", getOneItem);
app_.addEventListener("touchmove", getOneItem);
app_.addEventListener("scroll", addItems);
previewOn_.addEventListener("click", enlarge_);
_ok.addEventListener("click", okClose_);
CopyPreviewedOne_.addEventListener("mouseup", CopyTXT_);
copyType_div.forEach((div) => {
  div.addEventListener("mouseup", translateCopy);
});
document.documentElement.addEventListener("click", hideCopy);
document.querySelector(".settingsDiv").addEventListener("click", hideSettings);
document.documentElement.addEventListener("mouseup", () => {
  bodyMouseDownedWhenGoingToCopyCount = 0;

  document.querySelector("#vol").removeEventListener("mousemove", mousemoveVol);
  document.querySelector("#vol").removeEventListener("touchmove", mousemoveVol);
});
document.documentElement.addEventListener("touchend", () => {
  document.querySelector("#vol").removeEventListener("touchmove", mousemoveVol);
});
document.documentElement.addEventListener("touchcancel", () => {
  document.querySelector("#vol").removeEventListener("touchmove", mousemoveVol);
});
document.querySelector("div.triggerSetings").addEventListener("click", () => {
  document.querySelector("div.settingsDiv").style.display = "flex";
});
document.querySelector("#vol").addEventListener("mousedown", () => {
  document.querySelector("#vol").addEventListener("mousemove", mousemoveVol);
});
document.querySelector("#vol").addEventListener("touchstart", () => {
  document.querySelector("#vol").addEventListener("touchmove", mousemoveVol);
});
document
  .querySelector("select[name='mo_de']")
  .addEventListener("change", (e) => {
    let vl = parseInt(e.target.value);
    drkCnd = vl;

    bodyDRK(drkCnd);
    darkMOd(drkCnd);
  });

//commands
VOL_value();
changeHeightApp_();
stopLoad();
bodyDRK(drkCnd);

//exports
export { appTopics_init };
