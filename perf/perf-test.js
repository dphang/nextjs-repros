import http from "k6/http";
import { check, sleep } from "k6";
import { Rate } from "k6/metrics";

let failureRate = new Rate("check_failure_rate");

export let options = {
    thresholds: {
        // Check HTTP request duration is less than the following thresholds
        // Low thresholds since initial page is served by CloudFront cache
        http_req_duration: ["med<500"],
        // Thresholds based on the custom metric we defined and use to track application failures
        check_failure_rate: [
            // Global failure rate should be less than 1%
            "rate<0.01",
            // Abort the test early if it climbs over 5%
            { threshold: "rate<=0.05", abortOnFail: true },
        ],
    },
};

const BASE_URL = __ENV.K6_BASE_URL;

export function setup() {
    // Call URL once to ensure CloudFront cache gets enabled.
    let response = http.get(BASE_URL);

    check(response, {
        "status is 200": (r) => r.status === 200,
        "content is present": (r) => r.body !== {},
    });
}

export default function () {
    let response = http.get(BASE_URL);

    // check() returns false if any of the specified conditions fail
    let checkRes = check(response, {
        "status is 200": (r) => r.status === 200,
        "content is present": (r) => r.body !== {},
    });

    failureRate.add(!checkRes);

    sleep(Math.random() * 3 + 2); // Random sleep between 2s and 5s
}
