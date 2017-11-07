"use strict";
$(".cc-tabs-block").each(function() {
        var a, b, c = $(this).find("a");
        a = $(c.filter('[href="' + location.hash + '"]')[0] || c[0]), a.addClass("active"), b = $(a[0].hash), c.not(a).each(function() {
            $(this.hash).hide()
        }), $(this).on("click", "a", function(c) {
            a.removeClass("active"), b.hide(), a = $(this), b = $(this.hash), a.addClass("active"), b.show(), c.preventDefault()
        })
    }),
    function(a) {
        a(".cc-video-popover-link").click(function() {
            return a(".cc-video-popover").toggle(), !1
        }), a("#cc-closeVideoPopover").click(function() {
            return a(".cc-video-popover").hide(), !1
        }), a(".soundbyte01-video-popover-link").click(function() {
            return a(".soundbyte01-video-popover").toggle(), !1
        }), a("#soundbyte01-closeVideoPopover").click(function() {
            return a(".soundbyte01-video-popover").hide(), !1
        }), a(".soundbyte02-video-popover-link").click(function() {
            return a(".soundbyte02-video-popover").toggle(), !1
        }), a("#soundbyte02-closeVideoPopover").click(function() {
            return a(".soundbyte02-video-popover").hide(), !1
        }), a(".spacematrix-video-popover-link").click(function() {
            return a(".spacematrix-video-popover").toggle(), !1
        }), a("#spacematrix-closeVideoPopover").click(function() {
            return a(".spacematrix-video-popover").hide(), !1
        })
    }(jQuery),
    function(a) {
        a(".cc-accordion > .cc-accordion-content").hide(), a(".cc-accordion > .cc-accordion-title").click(function() {
            return a(this).toggleClass("open"), a(this).next().toggle(), !1
        })
    }(jQuery),
    function(a) {
        var b = "carousel",
            c = "." + b + "[data-paginate]",
            d = b + "-pagination",
            e = b + "-active-page",
            f = 5e3,
            g = {
                _createPagination: function() {
                    var c, e = a(this).find("." + b + "-nav"),
                        f = a(this).find("." + b + "-item"),
                        g = a('<ol class="' + d + '"></ol>');
                    e.find("." + d).remove(), f.each(function(a) {
                        c = a + 1, g.append('<li><a href="#' + c + '" title="Go to slide ' + c + '"></a>')
                    }), e.addClass(b + "-nav-paginated").find("a").first().after(g)
                },
                _bindPaginationEvents: function() {
                    a(this).bind("click", function(c) {
                        var e = a(c.target);
                        "IMG" === c.target.nodeName && (e = e.parent()), e = e.closest("a");
                        var f = e.attr("href");
                        e.closest("." + d).length && f && (a(this)[b]("goTo", parseFloat(f.split("#")[1])), c.preventDefault())
                    }).bind("goto." + b, function(b, c) {
                        var f = c ? a(c).index() : 0;
                        a(this).find("ol." + d + " li").removeClass(e).eq(f).addClass(e)
                    }).trigger("goto." + b)
                },
                play: function() {
                    var c = a(this),
                        d = c.attr("data-interval"),
                        e = parseFloat(d) || f;
                    return c.data("timer", setInterval(function() {
                        c[b]("next")
                    }, e))
                },
                stop: function() {
                    clearTimeout(a(this).data("timer"))
                },
                _bindStopListener: function() {
                    return a(this).bind("mousedown", function() {
                        a(this)[b]("stop")
                    })
                },
                _initAutoPlay: function() {
                    var c = a(this).attr("data-autoplay");
                    (c === !0 || null !== c && c !== !1) && a(this)[b]("_bindStopListener")[b]("play")
                }
            };
        a.extend(a.fn[b].prototype, g), a(document).on("create." + b, c, function() {
            a(this)[b]("_createPagination")[b]("_bindPaginationEvents")[b]("_initAutoPlay")
        }).on("update." + b, c, function() {
            a(this)[b]("_createPagination")[b]("_initAutoPlay")
        })
    }(jQuery),
    function(a) {
        a(function() {
            a("#cc-carousel").carousel()
        })
    }(jQuery);