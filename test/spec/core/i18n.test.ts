import * as mocha from 'mocha';
import * as chai from 'chai';
import { I18N } from '../../../core/i18n.provider';

const expect = chai.expect;

describe ('i18n provider', () => {
    it ('stores locale', (done) => {
        let provider: I18N = new I18N();
        provider.locale = 'en';
        expect(provider.locale).to.equal('en');
        done();
    });

    it ('translates string', (done) => {
        let provider: I18N = new I18N();
        provider.locale = 'en';
        expect(provider.tr('hello')).to.equal('hello');
        done();
    });
});