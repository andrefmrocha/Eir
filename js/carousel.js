const carousel = {
  index: 0,
  photos: [],
  size: 2,
  next: function(node) {
    this.index = (this.index + 1) % this.photos.length;
    this.buildCarousel(node);
  },
  previous: function(node) {
    this.index = this.index < 0 ? this.photos.length - 1 : this.index - 1;
    this.buildCarousel(node);
  },
  buildCarousel: function(node) {
    while (node.firstElementChild) {
      node.removeChild(node.firstElementChild);
    }
    for (let i = 0; i < this.size; i++) {
      node.appendChild(this.photos[(this.index + i) % this.photos.length]);
    }
  }
};

export default carousel;
