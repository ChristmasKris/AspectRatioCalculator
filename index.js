'use strict';

const index = {
   example: document.querySelector('.example'),
   aspecRatioDisplay: document.querySelector('.aspectRatio'),
   dimensionsDisplay: document.querySelector('.dimensions'),
   ratioSelect: document.querySelector('.ratioSelect'),
   ratioSelectState: false,
   input: {
      originalWidth: document.querySelector('#originalWidth'),
      originalHeight: document.querySelector('#originalHeight'),
      newWidth: document.querySelector('#newWidth'),
      newHeight: document.querySelector('#newHeight')
   },
   
   init() {
      index.updateExampleSize(1920, 1080);
      listener.add(index.ratioSelect, 'click', index.toggleRatioSelect);
      listener.add(document.querySelectorAll('.ratioSelectOption'), 'click', index.selectRatioOption);
      
      listener.add(window, 'click', (e) => {
         if (!elParent(e.target, '.ratioSelect')) {
            index.toggleRatioSelect(false);
         }
      });
      
      listener.add(index.input.originalWidth, 'keyup', () => {
         index.calc('w');
      });
      
      listener.add(index.input.originalHeight, 'keyup', () => {
         index.calc('h');
      });
      
      listener.add(index.input.newWidth, 'keyup', () => {
         index.calc('h');
      });
      
      listener.add(index.input.newHeight, 'keyup', () => {
         index.calc('w');
      });
   },
   
   selectRatioOption(e) {
      index.input.newWidth.value = '';
      index.input.newHeight.value = '';
      
      switch (e.currentTarget.getAttribute('option')) {
         case '0':
            index.updateExampleSize(7680, 4320);
            break;
         case '1':
            index.updateExampleSize(3840, 2160);
            break;
         case '2':
            index.updateExampleSize(2560, 1440);
            break;
         case '3':
            index.updateExampleSize(1920, 1080);
            break;
         case '4':
            index.updateExampleSize(1024, 768);
            break;
         case '5':
            index.updateExampleSize(1000, 1000);
            break;
         case '6':
            index.updateExampleSize(800, 600);
            break;
         case '7':
            index.updateExampleSize(720, 576);
            break;
         case '8':
            index.updateExampleSize(640, 480);
            break;
      }
   },
   
   toggleRatioSelect(newState) {
      if ((newState === index.ratioSelectState)) {
         return;
      }
      
      if (index.ratioSelectState) {
         index.ratioSelect.style.overflow = '';
         index.ratioSelect.style.borderBottomLeftRadius = '';
         index.ratioSelect.style.borderBottomRightRadius = '';
         index.ratioSelect.querySelector('.ratioSelectOptions').style.display = '';
      } else {
         index.ratioSelect.style.overflow = 'visible';
         index.ratioSelect.style.borderBottomLeftRadius = '0';
         index.ratioSelect.style.borderBottomRightRadius = '0';
         index.ratioSelect.querySelector('.ratioSelectOptions').style.display = 'block';
      }
      
      index.ratioSelectState = !index.ratioSelectState;
   },
   
   updateExampleSize(width, height) {
      let maxHeight = 400;
      let maxWidth = 600;
      let originalWidth = width;
      let originalHeight = height;
      let aspectRatio = width / height;
      width = maxWidth;
      height = width / aspectRatio;

      if (height > maxHeight) {
         height = maxHeight;
         width = height * aspectRatio;
      }
      
      index.input.originalWidth.value = originalWidth;
      index.input.originalHeight.value = originalHeight;
      index.example.style.width = `${width}px`;
      index.example.style.height = `${height}px`;
      index.aspecRatioDisplay.innerHTML = `${ratio.get(originalWidth, originalHeight)}`;
      
      if (width.toString().indexOf('.') > -1) {
         width = width.toFixed(2);
      }
      
      if (height.toString().indexOf('.') > -1) {
         height = height.toFixed(2);
      }
      
      index.dimensionsDisplay.innerHTML = `${width} x ${height}`;
   },
   
   calc(value) {
      let originalWidth = Number(index.input.originalWidth.value);
      let originalHeight = Number(index.input.originalHeight.value);
      let newWidth = Number(index.input.newWidth.value);
      let newHeight = Number(index.input.newHeight.value);
      
      if ((value === 'w') && ((index.input.originalWidth.value !== '') && (index.input.originalHeight.value !== ''))) {
         newWidth = ratio.getWidth(originalWidth, originalHeight, newHeight)
         
         if (newWidth.toString().indexOf('.') > -1) {
            newWidth = newWidth.toFixed(2);
         }
         
         index.input.newWidth.value = newWidth;
      } else if ((index.input.originalWidth.value !== '') && (index.input.originalHeight.value !== '')) {
         newHeight = ratio.getHeight(originalWidth, originalHeight, newWidth)
         
         if (newHeight.toString().indexOf('.') > -1) {
            newHeight = newHeight.toFixed(2);
         }
         
         index.input.newHeight.value = newHeight;
      }
      
      index.updateExampleSize(index.input.originalWidth.value, index.input.originalHeight.value);
   }
};

index.init();