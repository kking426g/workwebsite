<?php

namespace Gregwar\Captcha;

/**
 * Generates random phrase
 *
 * @author Gregwar <g.passault@gmail.com>
 */
class PhraseBuilder implements PhraseBuilderInterface
{

  var $_length=0;
    /**
     * Generates  random phrase of given length with given charset
     */
    public function build($length = 4, $charset = '1234567890')
    {
      if($this->_length==0)
      {
        $this->_length = $length;
      }
      
        $phrase = '';
        $chars = str_split($charset);

        for ($i = 0; $i < $this->_length; $i++) {
            $phrase .= $chars[array_rand($chars)];
        }

        return $phrase;
    }

    /**
     * "Niceize" a code
     */
    public function niceize($str)
    {
        return strtr(strtolower($str), '01', 'ol');
    }
}
