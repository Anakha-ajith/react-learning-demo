function createUserActionCounter() {
    let actionCount = 0;

    return function (userId) {
        actionCount++;
        return actionCount;
    };
}

const user1Counter = createUserActionCounter();
const user2Counter = createUserActionCounter();

console.log(user1Counter(101)); //1
console.log(user1Counter(101)); //2
console.log(user2Counter(102)); //1
console.log(user2Counter(102)); //2


function createUserSession() {
    let sessions = {};

    return function (userId, actionType) {

        if (!sessions[userId]) {
            sessions[userId] = {
                count: 0,
                actions: []
            };
        }

        sessions[userId].count++;
        sessions[userId].actions.push(actionType);

        return sessions;
    };
}

const sessionManager = createUserSession();

const result1 = sessionManager(1, "login");
const result2 = sessionManager(1, "click");
const result3 = sessionManager(2, "login");

console.log(result1[1].count);      //1
console.log(result2[1].count);      //2
console.log(result2[1].actions);    //["login","click"]
console.log(result3[2].count);      //1


function createMultiUserTracker() {

    const trackers = {};

    return function (userId) {

        if (!trackers[userId]) {

            let counter = 0;

            trackers[userId] = function () {
                counter++;
                return counter;
            };
        }

        return trackers[userId]();
    };
}

const tracker = createMultiUserTracker();

console.log(tracker(1)); //1
console.log(tracker(1)); //2
console.log(tracker(2)); //1
console.log(tracker(1)); //3
console.log(tracker(2)); //2