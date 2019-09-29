<template>
  <div style="text-align: right;" onselectstart="return false">
    <ul>
      <li @click="prev()" :class="{disabled:!hasPrev}">上一页</li>
      <li
        :pages="pages"
        v-for="(item,index) in pagebox"
        :key="index"
        @click="current(index+1,item)"
        :class="{active:item == pageCount}"
      >{{item}}</li>
      <li @click="next()" :class="{disabled:!hasNext}">下一页</li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hasPrev: false,
      hasNext: false,
      pagebox: [],
      pageCount: 1
    };
  },
  props: {
    pages: {
      type: Number,
      default: 0
    }
  },
  methods: {
    current(x, item) {
      if (item == "...") return;
      this.$emit("currentPage", x);
      this.pageCount = x;
    },
    prev() {
      if (this.pageCount > 1) {
        this.pageCount--;
        this.$emit("currentPage", this.pageCount);
      }
    },
    next() {
      if (this.pageCount < this.pages) {
        this.pageCount++;
        this.$emit("currentPage", this.pageCount);
      }
    },
    deal() {
      var pages = this.pages;
      this.pagebox = [];
      if (pages == 0) {
        this.hasPrev = false;
        this.hasNext = false;
      } else {
        if (pages <= 5) {
          for (let i = 1; i <= pages; i++) {
            this.pagebox.push(i);
          }
        } else {
          if (this.pageCount > 4 && this.pageCount < pages - 3) {
            this.pagebox = [
              1,
              "...",
              this.pageCount - 2,
              this.pageCount - 1,
              this.pageCount,
              this.pageCount + 1,
              this.pageCount + 2,
              "...",
              pages
            ];
          } else if (this.pageCount <= 4) {
            if (this.pageCount <= 2) {
              this.pagebox = [1, 2, 3, 4, "...", pages];
            } else if (this.pageCount == 3) {
              this.pagebox = [1, 2, 3, 4, 5, "...", pages];
            } else {
              this.pagebox = [1, 2, 3, 4, 5, 6, "...", pages];
            }
          } else if (this.pageCount >= pages - 3) {
            if (this.pageCount == pages - 3) {
              this.pagebox = [
                1,
                "...",
                this.pageCount - 2,
                this.pageCount - 1,
                this.pageCount,
                this.pageCount + 1,
                this.pageCount + 2,
                this.pageCount + 3
              ];
            } else if (this.pageCount == pages - 2) {
              this.pagebox = [
                1,
                "...",
                this.pageCount - 2,
                this.pageCount - 1,
                this.pageCount,
                this.pageCount + 1,
                this.pageCount + 2
              ];
            } else if (this.pageCount == pages - 1) {
              this.pagebox = [
                1,
                "...",
                this.pageCount - 2,
                this.pageCount - 1,
                this.pageCount,
                this.pageCount + 1
              ];
            } else {
              this.pagebox = [
                1,
                "...",
                this.pageCount - 3,
                this.pageCount - 2,
                this.pageCount - 1,
                this.pageCount
              ];
            }
          }
        }
      }
    }
  },
  mounted() {
    this.deal();
  },
  watch: {
    pageCount(newVal, oldVal) {
      if (newVal == 1) {
        this.hasPrev = false;
        this.hasNext = true;
      } else if (newVal == this.pages) {
        this.hasNext = false;
        this.hasPrev = true;
      } else {
        this.hasPrev = true;
        this.hasNext = true;
      }
      this.deal();
    },
    pages() {
      if (this.pages == 1) {
        this.hasPrev = false;
        this.hasNext = false;
      } else {
        this.hasPrev = false;
        this.hasNext = true;
      }
      this.deal();
    }
  }
};
</script>
<style scoped>
.active {
  background: #019aaa !important;
  color: #fff !important;
}
li {
  display: inline;
  position: relative;
  padding: 6px 12px;
  margin-left: -1px;
  line-height: 1.42857143;
  color: #019aaa;
  text-decoration: none;
  background-color: #fff;
  border: 1px solid #ddd;
  cursor: pointer;
}
.disabled {
  color: #aaa;
  cursor: not-allowed;
}
</style>