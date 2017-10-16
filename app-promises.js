const users = [{
    id: 1,
    name: 'ilker',
    schoolId: 101
}, {
    id: 2,
    name: 'ipek',
    schoolId: 606
}];

const grades = [{
    id: 1,
    schoolId: 101,
    grade: 90
},{
    id: 2,
    schoolId: 606,
    grade: 67
},{
    id: 3,
    schoolId: 101,
    grade: 89
}];

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        const user = users.find((user) => user.id === id);

        if (user) {
            resolve(user);
        } else {
          reject(`user not found by id of ${id}`);  
        }
    });
}

const getGrades = (schoolId) => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter((grade) => grade.schoolId === schoolId));
    });
}


const getStatus = (userId) => {
    let user;
    return getUser(userId).then((tempUser) => {
        user = tempUser;
        
        return getGrades(user.schoolId).then((grades) => {
            
            let average = 0;
            if (grades.length > 0) {
                average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
            }
            return `${user.name}has ${average} of average note`;
        }); 
    });
}

// Bu aşağıdaki promise dönen fonksiyon ile async fonksiyon aynı işi yapar
/* () => {
    return new Promise((resolve, reject) => {
        resolve('ilker');
    })
} */

const getStatusAlt = async (userId) => {
    let user = await getUser(userId);
    let grades = await getGrades(user.schoolId);
    let average = 0;
    if (grades.length > 0) {
        average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
    }
    return `${user.name}has ${average} of average note`;
}


getStatusAlt(1).then((name) => {
    console.log(name);
}).catch((e) => {
    console.log(e);
})

//console.log(getStatusAlt());

/* getUser(11).then((user) => {
    console.log(user);
}).catch((e) => {
    console.log(e);
}) */

/* getGrades(101).then((grades) => {
    console.log(grades);
}).catch((e) => {
    console.log(e);
}) */
/* 
getStatus(1).then((status) => {
    console.log(status);
}).catch((e) => {
    console.log(e);
}) */