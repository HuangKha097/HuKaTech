
import classNames from 'classnames/bind';

const styles = {
  'local-class': 'local-class-xyz'
};

const cx = classNames.bind(styles);

console.log('Result for local-class:', cx('local-class'));
console.log('Result for global-class:', cx('global-class'));
