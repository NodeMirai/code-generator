import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./index.scss";

export default class Modal extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    visible: false,
    title: "",
    showCancel: true,
    showOk: true,
    cancelText: "取消",
    okText: "确定",
    onCancel: () => {},
    onOk: () => {}
  }

  static protoTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string,
    showCancel: PropTypes.bool,
    showOk: PropTypes.bool,
    cancelText: PropTypes.string,
    okText: PropTypes.string,
    onCancel: PropTypes.func,
    onOk: PropTypes.func
  }
  
  state = {
    isShow: false
  };
  componentDidMount() {
    this.setState({
      isShow: this.props.visible
    });
  }
  componentWillReceiveProps(nextProps) {
    const { visible } = nextProps;
    const { isShow } = this.state;
    if (visible !== isShow) {
      this.setState({
        isShow: visible
      });
    }
  }

  handleTouchMove = e => {
    e.stopPropagation();
  };

  render() {
    const {
      title,
      showCancel,
      showOk,
      cancelText,
      okText,
      onCancel,
      onOk
    } = this.props;
    const { isShow } = this.state;
    const isShowAction = showCancel || showOk;
    const cls = classNames({
      "q-modal": true,
      "q-modal--visible": isShow
    });

    return (
      <View className={cls} onTouchMove={this.handleTouchMove}>
        <View className='q-modal__mask'  onClick={onCancel} />
        <View className='q-modal__wrapper'>
          {title && (
            <View className='q-modal__header'>
              <Text>{title}</Text>
            </View>
          )}
          <View className='q-modal__body'>{this.props.children}</View>
          {isShowAction && (
            <View className='q-modal__footer top-1px'>
              {showCancel && (
                <View
                  className='q-modal__btn q-modal__btn-cancel'
                  onClick={onCancel}
                >
                  <Text>{cancelText}</Text>
                </View>
              )}
              {showCancel &&
                showOk && <View className='q-modal__line right-1px' />}
              {showOk && (
                <View className='q-modal__btn q-modal__btn-ok' onClick={onOk}>
                  <Text>{okText}</Text>
                </View>
              )}
            </View>
          )}
        </View>
      </View>
    );
  }
}

