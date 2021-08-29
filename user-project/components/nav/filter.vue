<template>
  <div class="plan-nav">
      <ul class="container-muk d-flex align-items-center" id="mainNav">
        <slot>
        </slot>
      </ul>
  </div>

</template>

<script>
    /***
     * Created Subhi Al Wattar
     * User: Subhi Al Wattar
     * Date: 7/23/2020
     * Time: 5:23 PM
     ***/
    export default {
        name: "filter-nav"
    }
</script>

<style lang="scss">
.plan-nav {
  height: 54px !important;
  display: flex !important;
  z-index: 90;
  background: #fff;
  button{
    border:none ;
    outline: none ;
    height: 100%;
  }
  .input-group{
    height: 34px;
  }
  .container-muk{
    padding:10px 15px;
  }

  .dropdown__Props {
    height: 34px;
    direction: rtl !important;
    .dropdown__Menu__Props {

      width: 20rem;
      background-color: #FFF;
      box-shadow: 0 15px 30px -5px rgba(0, 0, 0, 0.07);
      .accordion {
        .card {
          .custom-radio {
            padding-left: 1rem;
            label {
              width: 13rem;
              padding-right: 1.5rem;
            }
            label::before {
              background-color: #fff !important;
              right: -.5rem;
              left: unset;
              width: 1.2rem;
              height: 1.2rem;
            }
            label::after {
              right: -.3rem;
              left: unset;
            }
            input:checked ~ label:after {
              background: $color_primary !important;
              border-radius: 50%;
              width: .8rem;
              height: .8rem;
              top: .45rem;
            }
          }
          label.For__Sale__Text, label.For__Rent__Text, label.For__Auction__Text {
            width: 3.5rem;
          }
          .Sale__Icon {
            color: #f01515;
          }
          .Rent__Icon {
            color: #1577f0;
          }
          .Auct__Icon {
            color: #59c00e;
          }
          .card-header {
            .Prop__Details {
              color: $color_primary;
            }
          }
          .coll {
            .Active__Prop__Status {
              background-color: $color_primary !important;
              color: #FFF !important;
            }
            button.Office__Prop, button.Develop__Prop {
              background-color: #e7ecf2;
              color: $color_dark;
              border: none;
              border-radius: .25rem !important;
              transition: unset !important;
            }
            button.btn-lig {
              background-color: #e7ecf2;
              color: $color_dark;
              border: none;
              border-radius: .25rem !important;
              transition: unset !important;
            }
            .container-fluid {
              .Prop__Area {
                label {
                  color: $color_dark;
                }
                select {
                  border-radius: .25rem !important;
                  color: $color_dark;
                  background-color: #e7ecf2;
                  border-color: $color_5;
                }
                select::after {
                  background-color: $color_primary;
                }
              }
              .Streets__Around {
                label {
                  color: $color_dark;
                }
                select {
                  border-radius: .25rem !important;
                  color: $color_dark;
                  background-color: #e7ecf2;
                  border-color: $color_5;
                }
                select::after {
                  background-color: $color_primary;
                }
              }
              .Prop__Place__Num {
                label {
                  color: $color_dark;
                }
                select {
                  border-radius: .25rem !important;
                  color: $color_dark;
                  background-color: #e7ecf2;
                  border-color: $color_5;
                }
                select::after {
                  background-color: $color_primary;
                }
              }

              .Build__Area {
                label {
                  color: $color_dark;
                }
                select {
                  border-radius: .25rem !important;
                  color: $color_dark;
                  background-color: #e7ecf2;
                  border-color: $color_5;
                }
                select::after {
                  background-color: $color_primary;
                }
              }
              .Sleep__Rooms {
                label {
                  color: $color_dark;
                }
                select {
                  border-radius: .25rem !important;
                  color: $color_dark;
                  background-color: #e7ecf2;
                  border-color: $color_5;
                }
                select::after {
                  background-color: $color_primary;
                }
              }
              .Water__Rooms {
                label {
                  color: $color_dark;
                }
                select {
                  border-radius: .25rem !important;
                  color: $color_dark;
                  background-color: #e7ecf2;
                  border-color: $color_5;
                }
                select::after {
                  background-color: $color_primary;
                }
              }
              .Shops__Num {
                label {
                  color: $color_dark;
                }
                select {
                  border-radius: .25rem !important;
                  color: $color_dark;
                  background-color: #e7ecf2;
                  border-color: $color_5;
                }
                select::after {
                  background-color: $color_primary;
                }
              }
              .Flats__Num {
                label {
                  color: $color_dark;
                }
                select {
                  border-radius: .25rem !important;
                  color: $color_dark;
                  background-color: #e7ecf2;
                  border-color: $color_5;
                }
                select::after {
                  background-color: $color_primary;
                }
              }

              .Prop__Age {
                label {
                  color: $color_dark;
                }
                select {
                  border-radius: .25rem !important;
                  color: $color_dark;
                  background-color: #e7ecf2;
                  border-color: $color_5;
                }
                select::after {
                  background-color: $color_primary;
                }
              }
              .Prop__Build__Type {
                label {
                  color: $color_dark;
                }
                select {
                  border-radius: .25rem !important;
                  color: $color_dark;
                  background-color: #e7ecf2;
                  border-color: $color_5;
                }
                select::after {
                  background-color: $color_primary;
                }
              }
            }
            .__Features {
              overflow-y: scroll;
              height: 20rem;
              direction: ltr;
              .d-flex {
                direction: rtl;
              }
            }
            .__Features::-webkit-scrollbar {
              width: 2px;
            }
            .__Features::-webkit-scrollbar-track {
              box-shadow: inset 0 0 5px grey;
              border-radius: 10px;
            }
            .__Features::-webkit-scrollbar-thumb {
              background: $color_primary;
              border-radius: 10px;
            }

          }
          .Prop__Features {
            color: $color_primary;
          }
          .Feature__Count {
            width: 1.3rem;
            height: 1.3rem;
            background-color: $color_primary;
            color: #FFF;
            border-radius: 50%;
          }
        }
        .btn-done {
          background-color: $color_primary !important;
          color: #FFF !important;
          border-radius: .25rem !important;
          border: none;
          width: 5.188rem;
          height: 1.875rem;
          padding-top: 0;
          padding-bottom: 0;
        }
        .Search__In__Details {
          h5 {
            color: $color_primary;
          }
          input {
            border-color: $color_5;
            border-radius: .25rem !important;
          }
        }

      }
      .container-fluid {
        .w-100, .w-50 {
          h5.text-primary {
            color: $color_primary !important;
          }
          .Active__Prop__Type {
            background-color: $color_primary !important;
            color: #FFF !important;
          }
          button {
            background-color: #e7ecf2;
            color: $color_dark;
            border-radius: .25rem !important;
            padding-bottom: 0;
            padding-top: 0;
            height: 1.875rem;
            position: relative;
            div {
              position: relative;
              z-index: 2 !important;
              padding-top: .25rem !important;
            }
            span {
              position: absolute;
              z-index: 1;
              top: 7px;
              padding-right: .4rem;
            }
          }
          .Area__Content, .Room__Numbers__Content, .Bathroom__Numbers__Content {
            height: 16.8rem;
            overflow-y: scroll;
            direction: ltr;
            .Select__Area, .Select__Room__Number, .Select__Bathroom__Numbers {
              direction: rtl;
              button {
                background-color: #e7ecf2;
                color: $color_dark;
                border-radius: .25rem !important;
                height: 1.875rem;
                padding-top: 0;
                padding-bottom: 0;
                position: relative;
                z-index: 1;
                div {
                  width: 100%;
                  height: 100%;
                  position: relative;
                  z-index: -1;
                }
              }
              .Active__Prop__Area {
                background-color: $color_primary !important;
                color: #FFF !important;
              }
            }
          }
          .Area__Content::-webkit-scrollbar, .Room__Numbers__Content::-webkit-scrollbar, .Bathroom__Numbers__Content::-webkit-scrollbar {
            width: 2px;
          }
          .Area__Content::-webkit-scrollbar-track, .Room__Numbers__Content::-webkit-scrollbar-track, .Bathroom__Numbers__Content::-webkit-scrollbar-track {
            box-shadow: inset 0 0 5px grey;
            border-radius: 10px;
          }
          .Area__Content::-webkit-scrollbar-thumb, .Room__Numbers__Content::-webkit-scrollbar-thumb, .Bathroom__Numbers__Content::-webkit-scrollbar-thumb {
            background: $color_primary;
            border-radius: 10px;
          }

        }
        span.V__Line {
          border: 1px solid rgba(0, 0, 0, .06);
        }
      }
      .btn-remove {
        background-color: $color_4 !important;
        color: #FFF !important;
        border-radius: .25rem !important;
        border: none;
        width: 5.188rem;
        height: 1.875rem;
        padding-top: 0;
        padding-bottom: 0;
      }
      .btn-done {
        background-color: $color_primary !important;
        color: #FFF !important;
        border-radius: .25rem !important;
        border: none;
        width: 5.188rem;
        height: 1.875rem;
        padding-top: 0;
        padding-bottom: 0;
      }
    }
    .Prop__Status__Menu {
      width: 15.375rem !important;
    }

  }
  .__Type
  {
    width: 16rem;
    .Prop__Type {
      div#Prop__Type {
        border-left: 0;
        border-color: $color_5;
        border-radius: 0 !important;
        text-align: right;
        height: 34px;
        span {
          color: #b9b9b9;
        }
      }
      .arrow-down {
        .input-group-text {
          background-color: #fff;
          border-right: 0;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          border-color: $color_5;
          border-top-left-radius: .25rem;
          border-bottom-left-radius: .25rem;
        }
        .icons {
          color: $color_5;
        }
      }
    }
    .Prop__Type:hover, .Prop__Type:focus, .Prop__Type:active {
      color: #FFF !important;
    }
    .dropdown__Menu__Props {
      width: 14.375rem;
    }
    .custom-control {
      label {
        margin-right: 2rem;
        color: $color_dark;
      }
      label:before, label:after {
        left: unset;
        right: -1.5rem;
      }
      .custom-control-input:checked ~ .custom-control-label::before, .custom-checkbox .custom-control-input:checked ~ .custom-control-label::before {
        background-color: $color_primary !important;
      }
    }
  }

}
</style>
