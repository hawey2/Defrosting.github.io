/* Defrosting — tương tác nhỏ, không cần thư viện ngoài. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* Menu trên điện thoại */
  var toggle = $('.nav-toggle'), nav = $('#site-nav');
  if (toggle && nav) toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });

  /* Sáng / tối */
  var themeBtn = $('.theme-toggle');
  if (themeBtn) themeBtn.addEventListener('click', function () {
    var root = document.documentElement;
    var cur = root.getAttribute('data-theme') ||
      (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var next = cur === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  /* Hiện dần khi cuộn tới, như màu thấm dần vào lụa */
  var reveals = $$('.reveal');
  if ('IntersectionObserver' in window) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); ro.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { ro.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* Dải ảnh căn đều: mỗi ảnh rộng theo đúng tỉ lệ của nó */
  $$('.strip img').forEach(function (img) {
    function fit() {
      if (img.naturalWidth && img.naturalHeight) {
        img.parentNode.style.flexGrow = (img.naturalWidth / img.naturalHeight).toFixed(3);
      }
    }
    if (img.complete) fit(); else img.addEventListener('load', fit);
  });

  var content = $('.post-content');

  /* Ảnh Markdown đứng một mình trong đoạn → <figure> có chú thích.
     ![mô tả](/assets/... "Chú thích hiện dưới ảnh"){: .wide} */
  if (content) {
    $$('p > img', content).forEach(function (img) {
      var p = img.parentNode;
      if (p.children.length !== 1 || p.textContent.trim() !== '') return;
      var fig = document.createElement('figure');
      fig.className = 'figure';
      if (img.classList.contains('wide')) fig.classList.add('figure--wide');
      if (img.classList.contains('full')) fig.classList.add('figure--full');
      var text = img.getAttribute('title') || img.getAttribute('alt');
      img.removeAttribute('title');
      fig.appendChild(img);
      if (text) {
        var cap = document.createElement('figcaption');
        var span = document.createElement('span');
        span.className = 'fig-text';
        span.textContent = text;
        cap.appendChild(span);
        fig.appendChild(cap);
      }
      p.parentNode.replaceChild(fig, p);
    });

    /* Đánh số hình: Hình 1, Hình 2… */
    var post = $('.post');
    if (post && post.getAttribute('data-figures') !== 'false') {
      var n = 0;
      $$('.figure', content).forEach(function (fig) {
        if (fig.closest('.gallery')) return;
        var cap = $('figcaption', fig);
        n += 1;
        fig.id = fig.id || 'hinh-' + n;
        if (cap) {
          var num = document.createElement('span');
          num.className = 'fig-num';
          num.textContent = 'Hình ' + n + '.';
          cap.insertBefore(num, cap.firstChild);
        }
      });
    }

    /* Neo cho tiêu đề + mục lục */
    var heads = $$('h2[id], h3[id]', content);
    var tocNav = $('.toc-nav');
    if (tocNav) {
      var toc = $('.toc');
      if (heads.length < 2) { toc.parentNode.removeChild(toc); }
      else {
        heads.forEach(function (h) {
          var a = document.createElement('a');
          a.href = '#' + h.id;
          a.textContent = h.textContent;
          if (h.tagName === 'H3') a.className = 'sub';
          tocNav.appendChild(a);
        });
        if ('IntersectionObserver' in window) {
          var links = $$('a', tocNav);
          var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
              if (!e.isIntersecting) return;
              links.forEach(function (l) { l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id); });
            });
          }, { rootMargin: '-80px 0px -70% 0px' });
          heads.forEach(function (h) { io.observe(h); });
        }
      }
    }
    heads.forEach(function (h) {
      var a = document.createElement('a');
      a.className = 'heading-anchor'; a.href = '#' + h.id; a.textContent = '#';
      a.setAttribute('aria-label', 'Liên kết tới mục này');
      h.insertBefore(a, h.firstChild);
    });
  }

  /* Lightbox: bấm vào ảnh để xem lớn, bấm lần nữa để xem 100% và cuộn/kéo */
  var lb = $('#lightbox');
  if (!lb) return;
  var lbImg = $('.lightbox-img', lb), lbCap = $('.lightbox-caption', lb),
      lbOpen = $('[data-lb="open"]', lb), stage = $('.lightbox-stage', lb);
  var items = $$('.post-content img, .post-cover img, .gallery img');
  var idx = -1, lastFocus = null;

  function captionFor(img) {
    var fig = img.closest('figure');
    var cap = fig && $('figcaption', fig);
    return cap ? cap.textContent.trim() : (img.alt || '');
  }
  function show(i) {
    idx = (i + items.length) % items.length;
    var img = items[idx];
    var src = img.getAttribute('data-full') || img.currentSrc || img.src;
    lb.classList.remove('zoomed');
    lbImg.src = src; lbImg.alt = img.alt || '';
    lbCap.textContent = captionFor(img);
    lbOpen.href = src;
    var multi = items.length > 1;
    $('[data-lb="prev"]', lb).hidden = !multi;
    $('[data-lb="next"]', lb).hidden = !multi;
  }
  function openLb(i) {
    lastFocus = document.activeElement;
    show(i); lb.hidden = false; document.body.classList.add('lb-open');
    $('[data-lb="close"]', lb).focus();
  }
  function closeLb() {
    lb.hidden = true; document.body.classList.remove('lb-open'); lbImg.removeAttribute('src');
    if (lastFocus) lastFocus.focus();
  }
  function zoom(e) {
    var on = !lb.classList.contains('zoomed');
    lb.classList.toggle('zoomed', on);
    if (on && e && e.clientX !== undefined) {
      var r = stage.getBoundingClientRect();
      var fx = (e.clientX - r.left) / r.width, fy = (e.clientY - r.top) / r.height;
      requestAnimationFrame(function () {
        stage.scrollLeft = fx * (stage.scrollWidth - stage.clientWidth);
        stage.scrollTop = fy * (stage.scrollHeight - stage.clientHeight);
      });
    }
  }

  items.forEach(function (img, i) {
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', 'Phóng to ảnh' + (img.alt ? ': ' + img.alt : ''));
    img.addEventListener('click', function () { openLb(i); });
    img.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLb(i); }
    });
  });
  lb.addEventListener('click', function (e) {
    var act = e.target.closest('[data-lb]');
    if (act) {
      var a = act.getAttribute('data-lb');
      if (a === 'close') closeLb();
      else if (a === 'prev') show(idx - 1);
      else if (a === 'next') show(idx + 1);
      else if (a === 'zoom') zoom();
      return;
    }
    if (e.target === lbImg) zoom(e);
    else if (e.target === stage) closeLb();
  });
  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLb();
    else if (e.key === 'ArrowLeft') show(idx - 1);
    else if (e.key === 'ArrowRight') show(idx + 1);
  });
})();
