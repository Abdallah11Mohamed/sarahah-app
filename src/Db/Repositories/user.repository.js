
import { userModel } from "../Models/user.model.js";
import { BaseRepository } from "./base.repository.js";

export class UserRepository extends BaseRepository {
    constructor() {
        super(userModel);
    }

    checkEmailDuplication(email) {
        return this.findOneDocument({ email });
    }
}

export const userRepo = new UserRepository();