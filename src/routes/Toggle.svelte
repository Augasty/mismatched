<script>
  import { toggleValue } from "./store";

    let curr_toggleValue;

    toggleValue.subscribe((value) => {
    curr_toggleValue = value;
  });
  let isChecked = true
  $: toggleValue.update(()=>isChecked)
  // $: console.log(curr_toggleValue)
  </script>
  
  <label class="slider-toggle">
    <input type="checkbox" bind:checked={isChecked} />
    <span class="slider"></span>
  </label>
  
  <style>
    .slider-toggle {
      display: inline-block;
      position: relative;
      justify-self: center;
      width: 60px;
      height: 30px;
    }
  
    input[type="checkbox"] {
      display: none;
    }
  
    .slider {
      position:absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: 0.4s ease-in;
      transition: 0.4s;
      border-radius: 30px;
    }
  
    input:checked + .slider {
      background-color: #4CAF50;
    }
  
    .slider:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 2px;
      bottom: 2px;
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;
      border-radius: 50%;
    }
  
    input:checked + .slider:before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }
  </style>