import { UserModelFactory } from '../../app/models/user.model';
import * as Faker from 'faker';
Faker.seed(new Date().getDay());
const seed = {
    environment: ['test', 'dev'],
    run: async () => {
        let UserModel = UserModelFactory();
        await UserModel.destroy({
            truncate: true
        });

        const ROW_COUNT = 10;
        for (let i = 0; i < ROW_COUNT; i++) {
            try {
                await UserModel.create({
                    username: Faker.internet.userName(),
                    password: Faker.internet.password()
                });
            } catch (err) {
                throw err;
            }
        }
    }
};

export { seed };