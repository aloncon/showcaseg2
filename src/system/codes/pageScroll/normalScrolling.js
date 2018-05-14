const normalScrolling = element => {
   window.scrollTo(0, element.getBoundingClientRect().y + window.scrollY);
};

export default normalScrolling;
