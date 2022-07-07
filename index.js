if (window.innerWidth >= 1288) {
  console.log("non vanilla");
  // https://stackoverflow.com/questions/61761439/how-to-get-css-scroll-snap-to-work-with-js-scroll-event-listener
  // https://stackoverflow.com/questions/61794477/css-scroll-snap-type-with-horizontal-scrolling
  // ウィンドウサイズが大きい場合はjQueryで対応
  $(".vertical .paragraph").on("wheel", function (e) {
    e.preventDefault();
    if (e.originalEvent.wheelDelta >= 0) {
      if ($(this).prev().length) {
        var prev = "#" + $(this).prev().attr("id");
        document.querySelector(prev).scrollIntoView({ behavior: "smooth" });
      }
    } else {
      if ($(this).next().length) {
        var next = "#" + $(this).next().attr("id");
        document.querySelector(next).scrollIntoView({ behavior: "smooth" });
      }
    }
  });

  const detectInteraction = (observedEntryInfoList) => {
    for (let index = 0; index < observedEntryInfoList.length; index++) {
      const observedEntryInfo = observedEntryInfoList[index];
      if (observedEntryInfo.isIntersecting) {
        console.log(`attach animation to`, observedEntryInfo.target);
        observedEntryInfo.target.style.animation = observedEntryInfo.target.dataset.animate;
      } else {
        console.log(`detach animation from`, observedEntryInfo.target);
        observedEntryInfo.target.style.animation = 'none';
      }
    }
  };
  
  const observer = new IntersectionObserver(detectInteraction);
  const animationItemList = [...document.querySelectorAll('.animate')];
  for (let index = 0; index < animationItemList.length; index++) {
    const animationItem = animationItemList[index];
    observer.observe(animationItem);
  }

} else {
  console.log("vanilla");
  // snap-scrollとはうまくいかない？
  const detectMouseWheel = (event, verticalDom) => {
    event.preventDefault();
    console.log(event, verticalDom.scrollLeft, event.deltaY);
    verticalDom.scrollLeft += event.deltaY;
  };
  const verticalDom = document.querySelector(`.vertical`);

  verticalDom.addEventListener(
    "wheel",
    (event) => {
      detectMouseWheel(event, verticalDom);
    },
    false
  );
}
