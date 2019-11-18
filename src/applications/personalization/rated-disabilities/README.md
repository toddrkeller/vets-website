# Overview

Rated Disabilities is a common function among the veteran community to see what their Total Calulated Disability Rating is, what has factored into that calculation and what is currently pending from the Claim Status Tool. These data are important as they inform the Veteran what their service connected rating is and what benefits they might be elegible for.

## Abstract

The React components in the Rated Disabilities page are wrapped in a `DowntimeNotification` component so that if the back end is expereinceing downtime, no further components will load. If the back end is not experiencing downtime, the front end components will then load.

When the Rated Disabilities front end components load, two API calls to the EVSS service are initiated from the React Components. These calls are made inside the `componentDidMount` lifecycle hooks when the respective components load so these calls are made asyncronously. The calls are

| Calling Component | URL Called | Data returned |
--------------------------------------------------
| <TotalRatedDisabilities /> | /disability_compensation_form/find_rating_info_pid | Total Disability Rating |
