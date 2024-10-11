import {Person} from "./Types/Person";
import {Role} from "./Enums/Role";

const meno: Person = {
    firstName:"Marek",
    lastName:"Rezny",
    role:Role.ADMIN
};
console.log(`Hello ${meno.firstName} ${meno.lastName} ${meno.role}!`);