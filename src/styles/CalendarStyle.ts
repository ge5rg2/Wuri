import styled from "styled-components";
import palette from "./palette";

export const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  max-width: 90%;

  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.2);
  .react-calendar {
    background-color: ${(props) => props.theme.bgColor};
    border: 1px solid
      ${(props) =>
        props.theme.mode === "dark" ? palette.gray[700] : palette.gray[200]};
    line-height: 1.125em;
  }

  .react-calendar--doubleView {
    width: 700px;
  }

  .react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
    margin: -0.5em;
  }

  .react-calendar--doubleView .react-calendar__viewContainer > * {
    width: 50%;
    margin: 0.5em;
  }

  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  }

  .react-calendar button:enabled:hover {
    cursor: pointer;
  }

  .react-calendar__navigation {
    display: flex;
    height: 44px;
    margin-bottom: 1em;
  }

  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
  }

  .react-calendar__navigation button:disabled {
    background-color: ${(props) => props.theme.bgColor};
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: ${(props) =>
      props.theme.mode === "dark" ? palette.gray[600] : "White"};
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.75em;
  }
  /*요일 */
  .react-calendar__month-view__weekdays__weekday {
    color: ${(props) => props.theme.textColor};
    padding: 0.5em;
  }

  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;
    font-weight: bold;
  }

  .react-calendar__month-view__days__day--weekend {
    color: ${(props) => props.theme.accentColor} !important;
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: #757575 !important;
  }

  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }

  .react-calendar__tile {
    max-width: 100%;
    padding: 10px 6.6667px;
    background: none;
    text-align: center;
    line-height: 16px;
  }

  .react-calendar__tile:disabled {
    background-color: ${(props) =>
      props.theme.mode === "dark" ? palette.gray[700] : "#f0f0f0"};
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: ${(props) =>
      props.theme.mode === "dark" ? palette.gray[600] : "White"};
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
  }

  .react-calendar__tile--now {
    background: #ffff76;
  }

  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #ffffa9;
  }

  .react-calendar__tile--hasActive {
    background: rgba(16, 163, 127);
    color: white !important;
  }

  /*캘린더 월별 클릭 색 */
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #0e8c6d;
  }

  .react-calendar__tile--active {
    background: rgba(16, 163, 127);
    color: white !important;
  }

  /*캘린더 날짜 클릭 색 */

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #0e8c6d;
  }

  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #e6e6e6;
  }
  .highlight {
    position: relative;
    abbr::after {
      font-size: 0.5rem;
      left: 37%;
      bottom: -0.1rem;
      position: absolute;
      content: "✅";
    }
  }
  .highlight_cop {
    position: relative;
    abbr::after {
      font-size: 0.5rem;
      left: 37%;
      bottom: -0.1rem;
      position: absolute;
      content: "💞";
    }
  }
  button.react-calendar__tile.react-calendar__month-view__days__day {
    color: ${(props) => props.theme.textColor};
  }
  span.react-calendar__navigation__label__labelText.react-calendar__navigation__label__labelText--from {
    color: ${(props) => props.theme.textColor};
  }
  .react-calendar__navigation__arrow {
    color: ${(props) => props.theme.textColor};
  }
  button.react-calendar__tile.react-calendar__year-view__months__month {
    color: ${(props) => props.theme.textColor};
  }
`;
