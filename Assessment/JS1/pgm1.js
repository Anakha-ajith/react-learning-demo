function User(name,age){
    this.name=name
    this.age=age
}

User.prototype.greet=function(){
    console.log('hi iam',this.name)
}

User.prototype.showAge=function(){
    console.log('my name is',this.name,'i am', this.age,'year old')
}

const user1=new User("anu",26)

user1.greet()
user1.showAge()

