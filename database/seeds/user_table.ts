import { User } from '../../app/models/user.model';
import * as Faker from 'faker';

const seed = {
    environment: ['test', 'dev'],
    run: async () => {
        await User.destroy({
            truncate: true
        });

        const ROW_COUNT = 10;
        for (let i = 0; i < ROW_COUNT; i++) {
            try {
                await User.create({
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