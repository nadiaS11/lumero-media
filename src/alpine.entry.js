import intersect from '@alpinejs/intersect';
import collapse from '@alpinejs/collapse';
import focus from '@alpinejs/focus';

/** @param {import('alpinejs').Alpine} Alpine */
export default (Alpine) => {
  Alpine.plugin(intersect);
  Alpine.plugin(collapse);
  Alpine.plugin(focus);
};
